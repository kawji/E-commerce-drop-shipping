"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { createProduct, type CreateProductInput } from "@/lib/actions/products";
import { formatPrice } from "@/lib/formatPrice";
import type { Cents, CurrencyCode, Product, ProductStatus } from "@/type/product";

/** Static category options (slug, name) offered by the admin form. */
const CATEGORY_OPTIONS: { slug: string; name: string }[] = [
  { slug: "headphones", name: "Headphones" },
  { slug: "electronics", name: "Electronics" },
  { slug: "wearables", name: "Wearables" },
  { slug: "tablets", name: "Tablets" },
  { slug: "computers", name: "Computers" },
];

interface AttributeRow {
  id: string;
  key: string;
  value: string;
}

interface VariantRow {
  id: string;
  name: string;
  sku: string;
  priceMajor: string;
  stock: string;
  attributesText: string;
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4)}`;
}

function parseMajorToCents(major: string): number {
  const n = Number.parseFloat(major.trim());
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 100);
}

const ATTRIBUTE_PRESETS = ["Color", "Size", "CPU", "RAM", "Storage", "Warranty"];

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#ee4d2d] focus:ring-2 focus:ring-[#ee4d2d]/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-zinc-800";
const hintClass = "mt-1 text-xs text-zinc-500";

function SectionCard({
  step,
  title,
  subtitle,
  children,
}: {
  step: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
          {step}
        </span>
        <div>
          <h2 className="font-bold text-zinc-900">{title}</h2>
          <p className="text-xs text-zinc-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function AdminNewProductPage() {
  const categories = CATEGORY_OPTIONS;

  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [categorySlug, setCategorySlug] = useState(
    categories[0]?.slug ?? "headphones",
  );
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const [priceMajor, setPriceMajor] = useState("549.00");
  const [stock, setStock] = useState("12");

  const [attributes, setAttributes] = useState<AttributeRow[]>([
    { id: newId("attr"), key: "Color", value: "Midnight Black" },
    { id: newId("attr"), key: "Warranty", value: "1 Year" },
  ]);
  const [variants, setVariants] = useState<VariantRow[]>([
    {
      id: newId("var"),
      name: "Default",
      sku: "NEW-DEFAULT",
      priceMajor: "549.00",
      stock: "12",
      attributesText: "Color=Midnight Black",
    },
  ]);

  const [status, setStatus] = useState<ProductStatus>("draft");
  const [isSaving, setIsSaving] = useState(false);
  const [savedProduct, setSavedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const priceCents = parseMajorToCents(priceMajor);
  const stockNum = Number.parseInt(stock, 10);
  const stockValid = Number.isSafeInteger(stockNum) && stockNum >= 0;

  const categoryName =
    categories.find((c) => c.slug === categorySlug)?.name ?? categorySlug;

  const previewFormatted = useMemo(() => {
    try {
      return formatPrice(priceCents as Cents, currency);
    } catch {
      return "-";
    }
  }, [priceCents, currency]);

  function addAttribute(presetKey = "") {
    setAttributes((prev) => [
      ...prev,
      { id: newId("attr"), key: presetKey, value: "" },
    ]);
  }

  function updateAttribute(id: string, patch: Partial<AttributeRow>) {
    setAttributes((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    );
  }

  function removeAttribute(id: string) {
    setAttributes((prev) => prev.filter((a) => a.id !== id));
  }

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      {
        id: newId("var"),
        name: "",
        sku: "",
        priceMajor: priceMajor || "0.00",
        stock: "0",
        attributesText: "",
      },
    ]);
  }

  function updateVariant(id: string, patch: Partial<VariantRow>) {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    );
  }

  function removeVariant(id: string) {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  }

  /** "Color=Red, Size=XL" -> { Color: "Red", Size: "XL" } */
  function parseAttributesText(text: string): Record<string, string> {
    const result: Record<string, string> = {};
    for (const pair of text.split(",")) {
      const separatorIndex = pair.indexOf("=");
      if (separatorIndex === -1) continue;
      const key = pair.slice(0, separatorIndex).trim();
      if (!key) continue;
      result[key] = pair.slice(separatorIndex + 1).trim();
    }
    return result;
  }

  /**
   * Build the Server Action payload. Every price is converted from the
   * major-unit input ("549.00") to integer cents here, once — the action and
   * the database only ever see cents.
   */
  function buildCreateInput(nextStatus: ProductStatus): CreateProductInput {
    return {
      name: name.trim(),
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      category: { id: categorySlug, name: categoryName, slug: categorySlug },
      basePriceCents: priceCents,
      currency,
      stockQuantity: stockValid ? stockNum : 0,
      // Product-level attributes (key/value rows) are stored as specifications.
      specifications: attributes
        .filter((a) => a.key.trim())
        .map((a) => ({ label: a.key.trim(), value: a.value })),
      status: nextStatus,
      variants: variants
        .filter((v) => v.name.trim() || v.sku.trim())
        .map((v, i) => ({
          sku: v.sku.trim() || `NEW-SKU-${i + 1}`,
          name: v.name.trim() || `Variant ${i + 1}`,
          priceCents: parseMajorToCents(v.priceMajor),
          stockQuantity: Number.parseInt(v.stock, 10) || 0,
          attributes: parseAttributesText(v.attributesText),
          isDefault: i === 0,
        })),
    };
  }

  /** Validates the form, then persists via the `createProduct` Server Action. */
  async function handleSave(nextStatus: ProductStatus) {
    setError(null);
    if (!name.trim()) {
      setError("กรุณากรอกชื่อสินค้า (Section 1)");
      return;
    }
    if (priceCents <= 0) {
      setError("ราคาขายต้องมากกว่า 0 (Section 2)");
      return;
    }
    if (!stockValid) {
      setError("จำนวนสต็อกต้องเป็นจำนวนเต็ม ≥ 0 (Section 2)");
      return;
    }

    setIsSaving(true);
    try {
      const result = await createProduct(buildCreateInput(nextStatus));
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setStatus(nextStatus);
      setSavedProduct(result.product);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "บันทึกสินค้าไม่สำเร็จ");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href="/admin/products"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
          >
            ← กลับรายการสินค้า
          </Link>
          <div>
            <p className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
              Seller Centre · Supabase
            </p>
            <h1 className="text-lg leading-tight font-bold text-zinc-900">
              เพิ่มสินค้าใหม่
              <span className="ml-2 align-middle text-xs font-medium text-zinc-500">
                Add New Product
              </span>
            </h1>
          </div>
          <div className="ms-auto flex items-center gap-2">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave("draft")}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "กำลังบันทึก…" : "Save as Draft"}
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleSave("active")}
              className="rounded-lg bg-[#ee4d2d] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#d73211] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "กำลังบันทึก…" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
        {savedProduct && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-800">
              ✅ บันทึกลง Supabase สำเร็จ — สถานะ:{" "}
              {savedProduct.status === "active"
                ? "Published (active)"
                : savedProduct.status}{" "}
              · ราคาถูกเก็บเป็น Cents แล้ว
            </p>
            <p className="mt-1 font-mono text-xs text-emerald-700">
              id: {savedProduct.id} · slug: {savedProduct.slug} · basePriceCents:{" "}
              {savedProduct.basePriceCents.toLocaleString()} · variants:{" "}
              {savedProduct.variants.length}
            </p>
            <Link
              href={`/products/${savedProduct.id}`}
              className="mt-2 inline-block text-sm font-semibold text-emerald-800 underline"
            >
              ดูหน้าสินค้า →
            </Link>
          </div>
        )}

        <div className="grid items-start gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {/* 1. Main info */}
            <SectionCard
              step="1"
              title="ข้อมูลหลัก"
              subtitle="ชื่อ · คำอธิบายย่อ/ยาว · หมวดหมู่ — ตรงกับ Product.name / shortDescription / description / category"
            >
              <div>
                <label className={labelClass} htmlFor="p-name">
                  ชื่อสินค้า *
                </label>
                <input
                  id="p-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="เช่น Apple AirPods Max"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="p-short">
                  คำอธิบายย่อ (Short description)
                </label>
                <input
                  id="p-short"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="ประโยคสั้น 1 บรรทัดสำหรับ feed / card"
                  className={inputClass}
                />
                <p className={hintClass}>{shortDescription.length} ตัวอักษร</p>
              </div>
              <div>
                <label className={labelClass} htmlFor="p-desc">
                  คำอธิบายสินค้า (Description แบบยาว)
                </label>
                <textarea
                  id="p-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder={"ไฮไลท์\n- จุดเด่น...\n\nในกล่อง\n- ..."}
                  className={`${inputClass} min-h-32 resize-y`}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="p-cat">
                    หมวดหมู่
                  </label>
                  <select
                    id="p-cat"
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                    className={inputClass}
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <p className={hintClass}>
                    ตัวเลือกหมวดหมู่ที่รองรับ ({categories.length} หมวด)
                  </p>
                </div>
                <div>
                  <label className={labelClass} htmlFor="p-currency">
                    สกุลเงิน
                  </label>
                  <select
                    id="p-currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                    className={inputClass}
                  >
                    <option value="USD">USD — US Dollar</option>
                    <option value="THB">THB — Thai Baht</option>
                  </select>
                </div>
              </div>
            </SectionCard>

            {/* 2. Price & stock */}
            <SectionCard
              step="2"
              title="ราคาและสต็อก"
              subtitle="กรอกราคาเป็นเงินปกติ ระบบแปลงกลับเป็น Cents ใน State อัตโนมัติ (basePriceCents)"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="p-price">
                    ราคาขาย (เงินปกติ) *
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm font-bold text-zinc-400">
                      {currency === "THB" ? "฿" : "$"}
                    </span>
                    <input
                      id="p-price"
                      inputMode="decimal"
                      value={priceMajor}
                      onChange={(e) => setPriceMajor(e.target.value)}
                      placeholder="549.00"
                      className={`${inputClass} ps-8 font-mono`}
                    />
                  </div>
                  <div className="mt-2 rounded-lg bg-orange-50 px-3 py-2 font-mono text-xs text-zinc-700 ring-1 ring-orange-200">
                    → basePriceCents ={" "}
                    <b className="text-[#ee4d2d]">
                      {priceCents.toLocaleString()}
                    </b>{" "}
                    · preview {previewFormatted}
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="p-stock">
                    จำนวนสต็อก *
                  </label>
                  <input
                    id="p-stock"
                    inputMode="numeric"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="12"
                    className={`${inputClass} font-mono`}
                  />
                  <p className={hintClass}>
                    เก็บเป็น{" "}
                    <code className="font-mono">stockQuantity: number</code>{" "}
                    {stockValid ? (
                      <span className="font-semibold text-emerald-600">
                        ✓ {stockNum.toLocaleString()} ชิ้น
                      </span>
                    ) : (
                      <span className="font-semibold text-red-600">
                        ✗ ต้องเป็นจำนวนเต็ม ≥ 0
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 3. Variant & Attributes */}
            <SectionCard
              step="3"
              title="Variant & Attributes"
              subtitle="คุณสมบัติไดนามิก (สี / ขนาด / CPU …) → เก็บเป็น attributes: Record<string,string> + variants[] ตาม Type Contract"
            >
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-700">
                    Attributes สินค้า ({attributes.length})
                  </span>
                  <span className="text-xs text-zinc-400">· เติมเร็ว:</span>
                  {ATTRIBUTE_PRESETS.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => addAttribute(k)}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
                    >
                      + {k}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {attributes.map((a) => (
                    <div key={a.id} className="flex gap-2">
                      <input
                        value={a.key}
                        onChange={(e) =>
                          updateAttribute(a.id, { key: e.target.value })
                        }
                        placeholder="Key — เช่น Color / Size / CPU"
                        className={`${inputClass} font-mono`}
                      />
                      <input
                        value={a.value}
                        onChange={(e) =>
                          updateAttribute(a.id, { value: e.target.value })
                        }
                        placeholder="Value — เช่น Red / XL / M3"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeAttribute(a.id)}
                        className="shrink-0 rounded-lg border border-transparent px-3 text-sm font-bold text-zinc-400 hover:bg-red-50 hover:text-red-600"
                        aria-label="ลบ attribute"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {attributes.length === 0 && (
                    <p className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-3 py-4 text-center text-sm text-zinc-500">
                      ยังไม่มี attribute — กดปุ่มด้านล่างเพื่อเพิ่ม
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => addAttribute()}
                  className="mt-2 rounded-lg border border-dashed border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-600 hover:border-[#ee4d2d] hover:text-[#ee4d2d]"
                >
                  + เพิ่ม Attribute
                </button>
              </div>

              <div className="border-t border-zinc-100 pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-700">
                    Variants ({variants.length})
                  </span>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700"
                  >
                    + เพิ่ม Variant
                  </button>
                </div>
                <div className="space-y-3">
                  {variants.map((v, idx) => (
                    <div
                      key={v.id}
                      className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-500">
                          VARIANT {idx + 1} ·{" "}
                          {parseMajorToCents(v.priceMajor).toLocaleString()} cents
                        </span>
                        <button
                          type="button"
                          onClick={() => removeVariant(v.id)}
                          className="text-xs font-semibold text-zinc-400 hover:text-red-600"
                        >
                          ลบ variant
                        </button>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          value={v.name}
                          onChange={(e) =>
                            updateVariant(v.id, { name: e.target.value })
                          }
                          placeholder="ชื่อ variant — เช่น Red / 256GB"
                          className={inputClass}
                        />
                        <input
                          value={v.sku}
                          onChange={(e) =>
                            updateVariant(v.id, { sku: e.target.value })
                          }
                          placeholder="SKU — เช่น NEW-RED"
                          className={`${inputClass} font-mono`}
                        />
                        <input
                          value={v.priceMajor}
                          onChange={(e) =>
                            updateVariant(v.id, { priceMajor: e.target.value })
                          }
                          placeholder="ราคา (เงินปกติ)"
                          inputMode="decimal"
                          className={`${inputClass} font-mono`}
                        />
                        <input
                          value={v.stock}
                          onChange={(e) =>
                            updateVariant(v.id, { stock: e.target.value })
                          }
                          placeholder="สต็อก"
                          inputMode="numeric"
                          className={`${inputClass} font-mono`}
                        />
                      </div>
                      <input
                        value={v.attributesText}
                        onChange={(e) =>
                          updateVariant(v.id, { attributesText: e.target.value })
                        }
                        placeholder="attributes — เช่น Color=Red, Size=XL"
                        className={`${inputClass} mt-2 font-mono text-xs`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* 4. Status */}
            <SectionCard
              step="4"
              title="สถานะสินค้า"
              subtitle="เลือก Draft เพื่อซ่อนจากหน้าร้าน หรือ Publish เพื่อขายทันที (status: draft | active)"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setStatus("draft")}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    status === "draft"
                      ? "border-amber-400 bg-amber-50"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <p className="font-bold text-zinc-900">📝 Save as Draft</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    บันทึกแบบร่าง ยังไม่แสดงใน feed / product page
                  </p>
                  <p className="mt-2 font-mono text-xs text-amber-700">
                    status: "draft"
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("active")}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    status === "active"
                      ? "border-emerald-400 bg-emerald-50"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <p className="font-bold text-zinc-900">🚀 Publish</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    เผยแพร่ทันที พร้อมขายในหน้าร้าน (mock)
                  </p>
                  <p className="mt-2 font-mono text-xs text-emerald-700">
                    status: "active"
                  </p>
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSave("draft")}
                  className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "กำลังบันทึก…" : "Save as Draft"}
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => handleSave("active")}
                  className="rounded-lg bg-[#ee4d2d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d73211] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "กำลังบันทึก…" : "Publish Product"}
                </button>
                <Link
                  href="/admin/products"
                  className="rounded-lg px-5 py-2.5 text-sm font-semibold text-zinc-500 hover:text-zinc-900"
                >
                  ยกเลิก
                </Link>
              </div>
            </SectionCard>
          </div>

          {/* Live summary */}
          <aside className="space-y-4 lg:sticky lg:top-20">
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900">
                Live Preview · State
              </h3>
              <p className="mb-3 text-xs text-zinc-500">
                ทุกช่องแปลงเป็น cents / status แบบเรียลไทม์
              </p>
              <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
                <div className="flex h-32 items-center justify-center bg-gradient-to-br from-orange-100 to-zinc-100 text-4xl">
                  🛍️
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-bold text-zinc-900">
                    {name || "(ชื่อสินค้า)"}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {shortDescription || "(คำอธิบายย่อ)"}
                  </p>
                  <p className="mt-2 text-base font-black text-[#ee4d2d]">
                    {previewFormatted}
                  </p>
                  <p className="font-mono text-[11px] text-zinc-400">
                    {priceCents.toLocaleString()} cents · {currency}
                  </p>
                </div>
              </div>
              <dl className="mt-3 space-y-1.5 font-mono text-xs text-zinc-600">
                <div className="flex justify-between">
                  <dt>category</dt>
                  <dd className="font-semibold text-zinc-900">{categoryName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>stockQuantity</dt>
                  <dd className="font-semibold text-zinc-900">
                    {stockValid ? stockNum.toLocaleString() : "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>attributes</dt>
                  <dd className="font-semibold text-zinc-900">
                    {attributes.length}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>variants</dt>
                  <dd className="font-semibold text-zinc-900">
                    {variants.length}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>status</dt>
                  <dd
                    className={`rounded-full px-2 py-0.5 font-bold ${
                      status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {status}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-xl border border-dashed border-zinc-300 bg-white/60 p-4 text-xs leading-relaxed text-zinc-500">
              <p className="font-bold text-zinc-700">Type Contract ref</p>
              <p className="mt-1 font-mono">
                {"basePriceCents: Cents · stockQuantity: number · status: ProductStatus · variants[].attributes: Record<string,string>"}
              </p>
              <p className="mt-2">
                บันทึกผ่าน Server Action{" "}
                <code className="font-mono">createProduct()</code> ลงตาราง
                products + product_variants ของ Supabase
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}