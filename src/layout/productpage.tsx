'use client'
import Navbar from "@/components/navbar"
import Image from "next/image"
import Staricon from "@/icons/star"
import SelectColor from "@/app/products/[id]/_components/selectColor"
import { useState } from "react"
import clsx from "clsx"
import ButtonCount from "@/app/products/[id]/_components/buttonCount"
import { Truck, Album } from 'lucide-react';
import TagProduct from "@/app/products/[id]/_components/tagProduct"
import { TagProductType } from "@/app/products/[id]/type/typeTag"
import Link from "next/link"
import ProductDescription from "@/components/ProductDescription"
import ProductSpecifications, { ProductSpecification } from "@/components/ProductSpecifications"
import RelatedProducts from "@/components/RelatedProducts"
import RecommendedProducts from "@/components/RecommendedProducts"
import ECommerceFooter from "@/components/ECommerceFooter"
import { MiniProduct } from "@/components/ProductMiniCard"
import ProductReviews, { ProductReview } from "@/components/ProductReviews"

// ===== Mock Data (ข้อมูลสมมติสำหรับทดสอบ Reusable Components) =====
// สังเกตุ: ข้อมูล description ใช้ \n (การขึ้นบรรทัดจริงใน Template Literal)
// ProductDescription จะเรNDER ให้ขึ้นบรรทัดตรงตามนี้ด้วย whitespace-pre-line
const MOCK_DESCRIPTION = `ไฮไลท์

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
- เอกสารประกอบและใบรับประกัน`

// ข้อมูลจำเพาะ (Specifications) โครงสร้างเดียวกับที่ Admin จะส่งมาให้ในอนาคต
const MOCK_SPECS: ProductSpecification[] = [
    { label: "Brand", value: "Apple" },
    { label: "Model", value: "AirPods Max" },
    { label: "Weight", value: "384.7 g" },
    { label: "Driver", value: "45mm dynamic driver" },
    { label: "Battery Life", value: "Up to 20 hours (ANC on)" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
    { label: "Chip", value: "Apple H1 (2 chips)" },
    { label: "Warranty", value: "1 year" },
]

// id ของสินค้าที่แสดงอยู่ในหน้านี้ (ทดสอบเงื่อนไขไม่แสดงสินค้าซ้ำใน RelatedProducts)
const CURRENT_PRODUCT_ID = "1"

// สินค้าหมวดหมู่เดียวกัน (Headphones) — Mock Data สำหรับทดสอบ RelatedProducts
// สังเกต: มี id "1" (สินค้าปัจจุบัน) ปนอยู่ เพื่อทดสอบว่า Component กรองออก
const MOCK_RELATED_PRODUCTS: MiniProduct[] = [
    { id: "1", name: "AirPods Max", price: 549.00, image: "/pg/headphone1-.png", rating: 4.8 },
    { id: "2", name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", price: 399.99, image: "/pg/headphone1.jpg", rating: 4.9 },
    { id: "3", name: "Bose QuietComfort Ultra Headphones", price: 429.00, image: "/pg/headphonegire.png", rating: 4.7 },
    { id: "4", name: "Sennheiser Momentum 4 Wireless Headphones", price: 349.95, image: "/itemHeadphone.jpg", rating: 4.6 },
    { id: "5", name: "JBL Tour One M2 Over-Ear Headphones", price: 299.95, image: "/pg/headphone1-.png", rating: 4.5 },
]

// สินค้าแนะนำคละหมวดหมู่ (เรตติ้ง >= 4.5) — Mock Data สำหรับทดสอบ RecommendedProducts
const MOCK_RECOMMENDED_PRODUCTS: MiniProduct[] = [
    { id: "101", name: "Apple iPhone 15 Pro Max 256GB Natural Titanium", price: 1299.00, image: "/pg/headphone1.jpg", rating: 4.9 },
    { id: "102", name: "Apple Watch Series 9 GPS 45mm Aluminium Case", price: 429.00, image: "/pg/headphonegire.png", rating: 4.7 },
    { id: "103", name: "iPad Air 11-inch M2 128GB Wi-Fi", price: 599.00, image: "/itemHeadphone.jpg", rating: 4.8 },
    { id: "104", name: "MacBook Air 13-inch M3 8GB 256GB SSD", price: 1099.00, image: "/pg/headphone1-.png", rating: 4.9 },
    { id: "105", name: "Sony WF-1000XM5 True Wireless Earbuds", price: 329.99, image: "/pg/headphone1.jpg", rating: 4.6 },
]

// ข้อมูลรีวิวสมมตติ — สำหรบั ทดสอบ ProductReviews
// สังเกต: attributes เป็็น key-value ยืดหยุ่น (สสี, การรบั ประกัน, ชองตอ่ ฯลฯ) และมรีีวิวทไี่ ม่มี attribute เพอื ทดสอบกรณวีา่ง
const MOCK_REVIEWS: ProductReview[] = [
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
]

export default function ProductPage() {
    const [currentColor, setCurrentColor] = useState("red");
    const [limitCountProduct, setLimitCountProduct] = useState(12);

    const AVAILABLE_COLORS = [
        { id: "red", bg600: "bg-red-600", bg300: "bg-red-300" },
        { id: "blue", bg600: "bg-blue-600", bg300: "bg-blue-300" },
        { id: "green", bg600: "bg-emerald-600", bg300: "bg-emerald-300" },
        { id: "zinc", bg600: "bg-zinc-600/90", bg300: "bg-zinc-300" },
    ];

    const DATA_TAG_PRODUCT: TagProductType[] = [
        { icon: Truck, section: "Free Delivery", word1: '', underword1: "Enter your Postal code for Delivery Availability", word2: '', underword2: "", word3: '', underword3: '', space: "gap-0" },
        { icon: Album, section: "Return Delivery", word1: "Free 30day Delivery Returns.", underword1: " Details", word2: '', underword2: "", word3: '', underword3: '', space: "gap-1" },
    ]

    return (
        <div className="flex flex-col items-center w-full bg-zinc-50">
            <Navbar />

            <div className="flex flex-col w-full max-w-380 mt-4 md:mt-8 px-4 sm:px-8 md:px-10 2xl:px-0 ">

                <div className="flex flex-col lg:flex-row w-full  gap-8 md:gap-10 2xl:gap-0   ">
                    
                    {/* ฝั่งซ้าย: รูปภาพสินค้า */}
                    <div className="flex flex-col  self-center w-full max-w-122 gap-4 shrink-0">
                        <div className="w-full self-center relative flex items-center justify-center aspect-square sm:aspect-square rounded-lg overflow-hidden bg-black/4 group hover:bg-black/7 cursor-zoom-in transition-all duration-300">
                            <Image
                                src={"/pg/headphone1-.png"}
                                alt="product headphone"
                                width={500} 
                                height={500}
                                className="object-cover group-hover:scale-105 transition-all duration-300"
                            />
                        </div>
                        
                        <div className="w-full h-20 sm:h-18 lg:h-20 aspect-square grid grid-cols-4 gap-2 sm:gap-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="w-full h-full group aspect-square flex items-center justify-center rounded overflow-hidden relative bg-black/4 cursor-pointer hover:bg-black/7 transition-all duration-300">
                                    <Image
                                        src={"/pg/headphone1-.png"}
                                        width={80}
                                        height={80}
                                        className="object-cover group-hover:scale-115 transition-all duration-300"
                                        alt="picture headphone"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ฝั่งขวา: รายละเอียดข้อความและปุ่มคำสั่งซื้อ */}
                    <div className="flex flex-col flex-1 bg-black/0 px-0 md:px-5 lg:px-10 2xl:px-15 text-zinc-950 min-w-0   ">
                        
                        {/* ชื่อสินค้าและรีวิว */}
                        <div className="flex flex-col bg-black/0 pb-5 md:pb-7 border-b border-b-black/8">
                            <h1 className="font-bold text-3xl md:text-4xl leading-snug md:leading-relaxed">Airpods-Max</h1>
                            <p className="font-medium text-sm md:text-base text-black/60 mt-1">a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.</p>
                            <div className='flex items-center mt-3 gap-1'>
                                {[...Array(5)].map((_, i) => (
                                    <Staricon key={i} className='text-green-500 w-4 h-4 md:w-5 md:h-5' />
                                ))}
                                <p className='text-xs ml-1 text-black/70'>(121 reviews)</p>
                            </div>
                        </div>

                        {/* ราคา */}
                        <div className="flex flex-col py-5 md:py-7 border-b border-b-black/8">
                            <h1 className="font-bold text-xl md:text-2xl text-zinc-950/88 leading-relaxed">$549.00 or $99.99/month</h1>
                            <p className="font-medium text-xs md:text-base text-black/60">a perfect balance of exhilarating.</p>
                        </div>

                        {/* เลือกสี */}
                        <div className="flex flex-col py-5 md:py-7 border-b border-b-black/8 gap-3">
                            <h1 className="font-bold text-lg md:text-2xl text-zinc-950/88 leading-relaxed">Choose a Color</h1>
                            <div className="flex items-center gap-3">
                                {AVAILABLE_COLORS.map((color) => (
                                    <SelectColor key={color.id} colorName={color.id} color600={color.bg600} color300={color.bg300} select={color.id === currentColor} onSelect={setCurrentColor} />
                                ))}
                            </div>
                        </div>

                        {/* ตัวเลือกจำนวน */}
                        <div className="flex flex-col py-5 md:py-7 gap-5">
                            <div className="flex items-center gap-6 md:gap-10">
                                <ButtonCount limit={limitCountProduct} />
                                <div className="flex flex-col text-xs md:text-sm font-medium text-zinc-950/90">
                                    <span className="flex items-center gap-1">
                                        <p>Only </p>
                                        <p className="text-yellow-600/90 font-semibold">{limitCountProduct} items</p>
                                        <p>Left!</p>
                                    </span>
                                    <span className="text-black/50">Don't miss it</span>
                                </div>
                            </div>

                            <div className="flex flex-col  sm:flex-row items-center gap-3 sm:gap-4 md:gap-5 mt-2 w-full  md:max-w-none 2xl:max-w-xl   ">
                                <Link href={'/checkout'} className="flex items-center justify-center w-full sm:flex-1 px-6 md:px-10 2xl:px-18 py-3 rounded-full bg-[#0f3612] text-zinc-100/90 hover:bg-[#0f3612e5] text-sm md:text-base font-semibold transition-all duration-300 cursor-pointer text-center">
                                    Buy Now
                                </Link>
                                <button className="flex items-center justify-center w-full sm:flex-1 px-6 md:px-10 2xl:px-18 py-3 rounded-full bg-zinc-50 border border-[#0f3612a4] text-[#0f3612a4] hover:bg-zinc-200/45 text-sm md:text-base font-semibold transition-all duration-300 cursor-pointer">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>



                <div className="flex flex-col gap-8 text-black/90 w-full mt-18 px-6 py-10 bg-zinc-50 shadow-xs border border-black/5 rounded ">
                    {/* Reusable Component: ส่วนรีวิิวสืนคา (Lazada-style, likes = useState ชั่ัวคราว) */}
                    <ProductReviews reviews={MOCK_REVIEWS} />

                    {/* Reusable Component: รายละเอียดทั่วไป (รองรับ \n ด้วย whitespace-pre-line) */}
                    <ProductDescription description={MOCK_DESCRIPTION} />

                    {/* Reusable Component: ข้อมูลจำเพาะ (Array<{ label, value }>) */}
                    <ProductSpecifications specs={MOCK_SPECS} />

                </div>

                {/* Reusable Component: สินค้าหมวดหมู่เดียวกัน (กรองสินค้าปัจจุบันออกอัตโนมัติ) */}
                <RelatedProducts
                    products={MOCK_RELATED_PRODUCTS}
                    currentProductId={CURRENT_PRODUCT_ID}
                    className="mt-16"
                />

                {/* Reusable Component: สินค้าแนะนำทั่วไป */}
                <RecommendedProducts
                    products={MOCK_RECOMMENDED_PRODUCTS}
                    className="mt-16"
                />

            </div>

            {/* Reusable Component: Footer ของเว็บไซต์ */}
            <ECommerceFooter />

        </div>
    )
}
