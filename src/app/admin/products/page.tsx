"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/productMockData";
import { formatPrice } from "@/lib/formatPrice";
import type { ProductStatus } from "@/type/product";

type StatusFilter = "all" | ProductStatus;
type CategoryFilter = "all" | string;

const STATUS_META: Record<
  ProductStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  active: {
    label: "Active",
    badgeClass: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dotClass: "bg-emerald-500",
  },
  draft: {
    label: "Draft",
    badgeClass: "bg-amber-50 text-amber-700 ring-amber-200",
    dotClass: "bg-amber-500",
  },
  archived: {
    label: "Archived",
    badgeClass: "bg-zinc-100 text-zinc-600 ring-zinc-200",
    dotClass: "bg-zinc-400",
  },
};

function getPrimarySku(productId: string): string {
  const product = PRODUCTS.find((p) => p.id === productId);
  const defaultVariant =
    product?.variants.find((v) => v.isDefault) ?? product?.variants[0];
  return defaultVariant?.sku ?? `MOCK-${productId.toUpperCase()}`;
}

function stockBadge(stock: number): string {
  if (stock <= 0) return "bg-red-50 text-red-700 ring-red-200";
  if (stock < 10) return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

export default function AdminProductListPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of PRODUCTS) {
      if (!map.has(p.category.slug)) map.set(p.category.slug, p.category.name);
    }
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, []);

  const counts = useMemo(() => {
    return {
      all: PRODUCTS.length,
      active: PRODUCTS.filter((p) => p.status === "active").length,
      draft: PRODUCTS.filter((p) => p.status === "draft").length,
      archived: PRODUCTS.filter((p) => p.status === "archived").length,
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (categoryFilter !== "all" && p.category.slug !== categoryFilter)
        return false;
      if (!q) return true;
      const sku = getPrimarySku(p.id).toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        sku.includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [statusFilter, categoryFilter, query]);

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* Top bar — Shopee/Lazada seller-centre vibe */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ee4d2d] text-lg font-black text-white">
              M
            </span>
            <div>
              <p className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
                Seller Centre · Mock
              </p>
              <h1 className="text-lg leading-tight font-bold text-zinc-900">
                จัดการสินค้า
                <span className="ml-2 align-middle text-xs font-medium text-zinc-500">
                  Product Management
                </span>
              </h1>
            </div>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <span className="hidden rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 sm:inline">
              {filtered.length} / {PRODUCTS.length} รายการ
            </span>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#ee4d2d] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d73211] active:scale-[0.98]"
            >
              <span className="text-base leading-none">+</span>
              Add New Product
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4 px-4 py-6 sm:px-6">
        {/* Stat chips */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              { key: "all", label: "ทั้งหมด", value: counts.all },
              { key: "active", label: "Active", value: counts.active },
              { key: "draft", label: "Draft", value: counts.draft },
              { key: "archived", label: "Archived", value: counts.archived },
            ] as const
          ).map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() =>
                setStatusFilter(s.key as StatusFilter)
              }
              className={`rounded-xl border bg-white p-3.5 text-left transition hover:shadow-md ${
                statusFilter === s.key
                  ? "border-[#ee4d2d] ring-1 ring-[#ee4d2d]"
                  : "border-zinc-200"
              }`}
            >
              <p className="text-xs font-medium text-zinc-500">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">{s.value}</p>
            </button>
          ))}
        </div>

        {/* Mock filters */}
        <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 focus-within:border-[#ee4d2d] focus-within:bg-white">
              <span aria-hidden>🔍</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหาชื่อสินค้า / SKU / ID…"
                className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-900"
                >
                  ล้าง
                </button>
              )}
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <span className="font-medium text-zinc-600">หมวดหมู่</span>
                <select
                  value={categoryFilter}
                  onChange={(e) =>
                    setCategoryFilter(e.target.value as CategoryFilter)
                  }
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 outline-none focus:border-[#ee4d2d]"
                >
                  <option value="all">ทุกหมวดหมู่</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm">
                <span className="font-medium text-zinc-600">สถานะ</span>
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as StatusFilter)
                  }
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-800 outline-none focus:border-[#ee4d2d]"
                >
                  <option value="all">ทุกสถานะ</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </label>

              {(statusFilter !== "all" || categoryFilter !== "all" || query) && (
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("all");
                    setCategoryFilter("all");
                    setQuery("");
                  }}
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  รีเซ็ตตัวกรอง
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-zinc-400">
            * Mock Filter — กรองจากข้อมูลใน{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono">
              src/data/productMockData.ts
            </code>{" "}
            ฝั่ง client เท่านั้น ยังไม่ต่อ API
          </p>
        </section>

        {/* Table */}
        <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                  <th className="px-4 py-3">สินค้า</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">หมวดหมู่</th>
                  <th className="px-4 py-3 text-right">สต็อก</th>
                  <th className="px-4 py-3 text-right">ราคา</th>
                  <th className="px-4 py-3">สถานะ</th>
                  <th className="px-4 py-3 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.map((p) => {
                  const thumb = p.images[0];
                  const sku = getPrimarySku(p.id);
                  const meta = STATUS_META[p.status];
                  return (
                    <tr key={p.id} className="transition hover:bg-orange-50/40">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
                            {thumb ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={thumb.src}
                                alt={thumb.alt}
                                className="h-full w-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-zinc-300">
                                —
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="max-w-[320px] truncate font-semibold text-zinc-900">
                              {p.name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-zinc-500">
                              ID: {p.id} · {p.variants.length} variant
                              {p.variants.length > 1 ? "s" : ""} · ★{" "}
                              {p.rating.toFixed(1)} ({p.reviewCount})
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="rounded bg-zinc-100 px-2 py-1 font-mono text-xs text-zinc-700">
                          {sku}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
                          {p.category.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`inline-flex min-w-14 justify-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${stockBadge(p.stockQuantity)}`}
                        >
                          {p.stockQuantity.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-bold text-zinc-900">
                          {formatPrice(p.basePriceCents, p.currency)}
                        </p>
                        <p className="font-mono text-[11px] text-zinc-400">
                          {p.basePriceCents.toLocaleString()} cents
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${meta.badgeClass}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${meta.dotClass}`}
                          />
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
                        >
                          แก้ไข
                        </button>{" "}
                        <button
                          type="button"
                          className="rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
              <p className="text-4xl">📦</p>
              <p className="font-semibold text-zinc-900">ไม่พบสินค้าที่ตรงกับตัวกรอง</p>
              <p className="text-sm text-zinc-500">
                ลองเปลี่ยนหมวดหมู่ / สถานะ หรือล้างคำค้นหา
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setQuery("");
                }}
                className="mt-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
              >
                ล้างตัวกรองทั้งหมด
              </button>
            </div>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-200 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
            <span>
              แสดง {filtered.length} จาก {PRODUCTS.length} รายการ · ราคาแปลงจากหน่วย
              Cents ด้วย{" "}
              <code className="font-mono">formatPrice()</code>
            </span>
            <span className="font-mono">route: /admin/products · mock only</span>
          </footer>
        </section>
      </main>
    </div>
  );
}