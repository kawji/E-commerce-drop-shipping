-- Step 2 — Server Actions data layer
-- Tables backing `getProducts()`, `getProductByIdOrSlug()` and `createProduct()`.
--
-- Canonical money rule: every `*_cents` column is an INTEGER number of cents
-- (USD 549.00 -> 54900, THB 283.00 -> 28300). No FLOAT/NUMERIC price columns
-- exist anywhere in the schema so rounding drift cannot occur.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- products — canonical product entity (source of truth for Feed + Detail)
-- ---------------------------------------------------------------------------
create table if not exists public.products (
    id                   uuid primary key default gen_random_uuid(),
    slug                 text not null unique,
    name                 text not null,
    short_description    text not null default '',
    description          text not null default '',
    -- ProductCategory { id, name, slug } stored as jsonb (no separate table needed)
    category             jsonb not null default '{}'::jsonb,
    base_price_cents     integer not null check (base_price_cents >= 0),
    compare_at_price_cents integer check (compare_at_price_cents is null or compare_at_price_cents >= 0),
    currency             text not null default 'USD' check (currency in ('USD', 'THB')),
    images               jsonb not null default '[]'::jsonb,
    colors               jsonb not null default '[]'::jsonb,
    specifications       jsonb not null default '[]'::jsonb,
    reviews              jsonb not null default '[]'::jsonb,
    services             jsonb not null default '[]'::jsonb,
    financing_options    jsonb,
    rating               double precision not null default 0 check (rating >= 0 and rating <= 5),
    review_count         integer not null default 0 check (review_count >= 0),
    stock_quantity       integer not null default 0 check (stock_quantity >= 0),
    status               text not null default 'draft' check (status in ('draft', 'active', 'archived')),
    is_featured          boolean not null default false,
    created_at           timestamptz not null default now(),
    updated_at           timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- product_variants — sellable versions of a product (own price / stock / attrs)
-- ---------------------------------------------------------------------------
create table if not exists public.product_variants (
    id                   uuid primary key default gen_random_uuid(),
    product_id           uuid not null references public.products (id) on delete cascade,
    sku                  text not null,
    name                 text not null,
    price_cents          integer not null check (price_cents >= 0),
    compare_at_price_cents integer check (compare_at_price_cents is null or compare_at_price_cents >= 0),
    stock_quantity       integer not null default 0 check (stock_quantity >= 0),
    attributes           jsonb not null default '{}'::jsonb,
    image                jsonb,
    is_default           boolean not null default false,
    created_at           timestamptz not null default now(),
    constraint product_variants_sku_per_product unique (product_id, sku)
);

create index if not exists products_status_created_at_idx
    on public.products (status, created_at desc);
create index if not exists products_slug_idx
    on public.products (slug);
create index if not exists product_variants_product_id_idx
    on public.product_variants (product_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- The storefront reads through the anon key; createProduct() inserts with the
-- anon key from the Server Action. Tighten INSERT/DELETE to `authenticated`
-- (or a service-role key) before going to production.
-- ---------------------------------------------------------------------------
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
    on public.products for select
    using (true);

drop policy if exists "Public insert products" on public.products;
create policy "Public insert products"
    on public.products for insert
    with check (true);

-- Needed by createProduct()'s compensating rollback (delete product on variant failure).
drop policy if exists "Public delete products" on public.products;
create policy "Public delete products"
    on public.products for delete
    using (true);

drop policy if exists "Public read product_variants" on public.product_variants;
create policy "Public read product_variants"
    on public.product_variants for select
    using (true);

drop policy if exists "Public insert product_variants" on public.product_variants;
create policy "Public insert product_variants"
    on public.product_variants for insert
    with check (true);

drop policy if exists "Public delete product_variants" on public.product_variants;
create policy "Public delete product_variants"
    on public.product_variants for delete
    using (true);