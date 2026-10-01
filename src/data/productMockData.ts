import { Truck, Album } from "lucide-react"
import type { TagProductType } from "@/app/products/[id]/type/typeTag"
import type { ProductSpecification } from "@/components/ProductSpecifications"
import type { MiniProduct } from "@/components/ProductMiniCard"
import type { ProductReview } from "@/components/ProductReviews"

/**
 * ============================================================================
 *  Product Mock Data
 * ----------------------------------------------------------------------------
 *  รวมข้อมูลจำลอง (Mock Data) ทั้งหมดที่ใช้ในหน้า Product Detail ไว้ที่เดียว
 *  เพื่อให้ไฟล์หน้าจอ (Page/Layout) ทำหน้าที่เพียงจัด Layout และเรียก Component
 *
 *  หมายเหตุ: โครงสร้าง Type ของแต่ละชุดข้อมูล ถูกออกแบบให้ตรงกับที่คาดว่า
 *  Admin/API/Supabase จะส่งมาจริงในอนาคต จึงสามารถสลับไปใช้ข้อมูลจริงได้ทันที
 * ============================================================================
 */

/** id ของสินค้าที่กำลังแสดงอยู่ในหน้านี้ (ใช้กรองสินค้าปัจจุบันออกจาก Related) */
export const CURRENT_PRODUCT_ID = "1";

/**
 * ตัวเลือกสีของสินค้า (Product Color Attributes)
 * เก็บเป็นคลาส Tailwind ของเฉดสี เพื่อให้ SelectColor นำไปใช้ตรง ๆ
 */
export interface ProductColorOption {
    /** รหัสสี (เช่น "red", "blue") ใช้เปรียบเทียบกับสีที่ถูกเลือก */
    id: string;
    /** คลาส Tailwind ของเฉดเข้ม (bg-*-600) */
    bg600: string;
    /** คลาส Tailwind ของเฉดอ่อน (bg-*-300) */
    bg300: string;
}

export const PRODUCT_COLOR_OPTIONS: ProductColorOption[] = [
    { id: "red", bg600: "bg-red-600", bg300: "bg-red-300" },
    { id: "blue", bg600: "bg-blue-600", bg300: "bg-blue-300" },
    { id: "green", bg600: "bg-emerald-600", bg300: "bg-emerald-300" },
    { id: "zinc", bg600: "bg-zinc-600/90", bg300: "bg-zinc-300" },
];

/**
 * ข้อมูลแท็ก/บริการเสริมของสินค้า (เช่น Free Delivery, Return Delivery)
 * ใช้กับ Component TagProduct
 */
export const PRODUCT_SERVICE_TAGS: TagProductType[] = [
    {
        icon: Truck,
        section: "Free Delivery",
        word1: "",
        underword1: "Enter your Postal code for Delivery Availability",
        word2: "",
        underword2: "",
        word3: "",
        underword3: "",
        space: "gap-0",
    },
    {
        icon: Album,
        section: "Return Delivery",
        word1: "Free 30day Delivery Returns.",
        underword1: " Details",
        word2: "",
        underword2: "",
        word3: "",
        underword3: "",
        space: "gap-1",
    },
];

/**
 * รายละเอียดสินค้าแบบข้อความยาว (Product Description)
 * ใช้ \n (ขึ้นบรรทัดใหม่จริงใน Template Literal)
 * ProductDescription จะ render ให้ขึ้นบรรทัดตรงตามนี้ด้วย whitespace-pre-line
 */
export const PRODUCT_DESCRIPTION = `ไฮไลท์

Apple AirPods Max หุ้ฟหู Over-Ear ที่สมดุลงน้ำระหว่องเสียงคุณภาพสูง และความสบายในการสวมใส่ที่ไม่เหมือนใคร

- Dynamic Head Tracking สำหรับประสบการณ์เสียงแบบ Spatial Audio
- Active Noise Cancellation (ANC) ตัดเสียงรอบข້างได้อัตโนมัติ
- Transparency Mode ได้ยินเสียงแวดล้อมอย่างเป็นธรรมชาติ
- Adaptive EQ จูนเสียงแบบเรียลไทม์ตามรูปทรงหุ้ฟหูของแต่ละคน
- แบตเตอรี่ใช้งานได้สูงสุด 20 ชั่วโมง ต่อการชาร์จ 1 ครั้ง
- ชิป H1 ประมวลผลเสียงได้สูงสุด 900 ล้านครั้่งต่อวินาที

การเชื่อมต่อ
- Bluetooth 5.0 รัศมีใช้งานประมาณ 10 เมตร
- จับคู่อัตโนมัติกับอุปกรณ์ Apple ทั้งหมด

ในกล่อง
- AirPods Max
- Smart Case
- สาย Lightning to USB-C Cable
- เอกสารประกอบและใบรับประกัน`;

/**
 * ข้อมูลจำเพาะ (Specifications) โครงสร้างเดียวกับที่ Admin จะส่งมาให้ในอนาคต
 */
export const PRODUCT_SPECS: ProductSpecification[] = [
    { label: "Brand", value: "Apple" },
    { label: "Model", value: "AirPods Max" },
    { label: "Weight", value: "384.7 g" },
    { label: "Driver", value: "45mm dynamic driver" },
    { label: "Battery Life", value: "Up to 20 hours (ANC on)" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
    { label: "Chip", value: "Apple H1 (2 chips)" },
    { label: "Warranty", value: "1 year" },
];

/**
 * สินค้าหมวดหมู่เดียวกัน (Headphones) — Mock Data สำหรับทดสอบ RelatedProducts
 * สังเกต: มี id "1" (สินค้าปัจจุบัน) ปนอยู่ เพื่อทดสอบว่า Component กรองออก
 */
export const RELATED_PRODUCTS: MiniProduct[] = [
    { id: "1", name: "AirPods Max", price: 549.0, image: "/pg/headphone1-.png", rating: 4.8 },
    { id: "2", name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", price: 399.99, image: "/pg/headphone1.jpg", rating: 4.9 },
    { id: "3", name: "Bose QuietComfort Ultra Headphones", price: 429.0, image: "/pg/headphonegire.png", rating: 4.7 },
    { id: "4", name: "Sennheiser Momentum 4 Wireless Headphones", price: 349.95, image: "/itemHeadphone.jpg", rating: 4.6 },
    { id: "5", name: "JBL Tour One M2 Over-Ear Headphones", price: 299.95, image: "/pg/headphone1-.png", rating: 4.5 },
];

/**
 * สินค้าแนะนำคละหมวดหมู่ (เรตติ้ง >= 4.5) — Mock Data สำหรับทดสอบ RecommendedProducts
 */
export const RECOMMENDED_PRODUCTS: MiniProduct[] = [
    { id: "101", name: "Apple iPhone 15 Pro Max 256GB Natural Titanium", price: 1299.0, image: "/pg/headphone1.jpg", rating: 4.9 },
    { id: "102", name: "Apple Watch Series 9 GPS 45mm Aluminium Case", price: 429.0, image: "/pg/headphonegire.png", rating: 4.7 },
    { id: "103", name: "iPad Air 11-inch M2 128GB Wi-Fi", price: 599.0, image: "/itemHeadphone.jpg", rating: 4.8 },
    { id: "104", name: "MacBook Air 13-inch M3 8GB 256GB SSD", price: 1099.0, image: "/pg/headphone1-.png", rating: 4.9 },
    { id: "105", name: "Sony WF-1000XM5 True Wireless Earbuds", price: 329.99, image: "/pg/headphone1.jpg", rating: 4.6 },
];

/**
 * ข้อมูลรีวิวสมมติ — สำหรับทดสอบ ProductReviews
 * สังเกต: attributes เป็น key-value ยืดหยุ่น (สี, การรับประกัน, ช่องต่อ ฯลฯ)
 * และมีรีวิวที่ไม่มี attribute เพื่อทดสอบกรณีว่าง
 */
export const PRODUCT_REVIEWS: ProductReview[] = [
    {
        id: "r1",
        userName: "Somchai Jaidee",
        createdAt: "2026-09-12T10:30:00Z",
        rating: 5,
        attributes: [
            { name: "Color", value: "Midnight Black" },
            { name: "Warranty", value: "1 Year" },
        ],
        comment: "เสยี งดีมาก ANC ตัดเสยี งรอบขา้งไดเ้ นียนมาก\nใสท่ ำงานทัง้ วันไมป่ วดหู คุม้ ค่าราคาครับ",
        likes: 128,
        isVerified: true,
    },
    {
        id: "r2",
        userName: "Jane D.",
        createdAt: "2026-09-05T08:15:00Z",
        rating: 4,
        attributes: [
            { name: "Color", value: "Sky Blue" },
            { name: "Connector", value: "USB-C" },
        ],
        comment: "Sound quality is superb, spatial audio is impressive.\nBattery could be better for the price though.",
        likes: 56,
        isVerified: true,
    },
    {
        id: "r3",
        userName: "Mook KP",
        createdAt: "2026-08-28T14:45:00Z",
        rating: 5,
        attributes: [{ name: "Color", value: "Green" }],
        comment: "สที ี่เขียวสวยมาก มาพรอ้ มเคสกนั กระแทกไดด้ ี สง่ เรว็ มากค่ะ",
        likes: 33,
    },
    {
        id: "r4",
        userName: "Guest Buyer",
        createdAt: "2026-08-20T19:05:00Z",
        rating: 3,
        attributes: [],
        comment: "สนิ ค้าปกติดี แตเ่ สยี งเบสไมแ่ นน่ เท่าทคี่ ิด",
        likes: 7,
    },
];