'use client'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Staricon from "@/icons/star"
import SelectColor from "@/app/products/[id]/_components/selectColor"
import ButtonCount from "@/app/products/[id]/_components/buttonCount"
import ProductDescription from "@/components/ProductDescription"
import ProductSpecifications from "@/components/ProductSpecifications"
import RelatedProducts from "@/components/RelatedProducts"
import RecommendedProducts from "@/components/RecommendedProducts"
import ECommerceFooter from "@/components/ECommerceFooter"
import ProductReviews from "@/components/ProductReviews"
import {
    CURRENT_PRODUCT_ID,
    PRODUCT_COLOR_OPTIONS,
    PRODUCT_DESCRIPTION,
    PRODUCT_SPECS,
    RELATED_PRODUCTS,
    RECOMMENDED_PRODUCTS,
    PRODUCT_REVIEWS,
} from "@/data/productMockData"

export default function ProductPage() {
    const [currentColor, setCurrentColor] = useState("red");
    const [limitCountProduct] = useState(12);
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
                                {PRODUCT_COLOR_OPTIONS.map((color) => (
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
                                    <span className="text-black/50">Don’t miss it</span>
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
                    <ProductReviews reviews={PRODUCT_REVIEWS} />

                    {/* Reusable Component: รายละเอียดทั่วไป (รองรับ \n ด้วย whitespace-pre-line) */}
                    <ProductDescription description={PRODUCT_DESCRIPTION} />

                    {/* Reusable Component: ข้อมูลจำเพาะ (Array<{ label, value }>) */}
                    <ProductSpecifications specs={PRODUCT_SPECS} />

                </div>

                {/* Reusable Component: สินค้าหมวดหมู่เดียวกัน (กรองสินค้าปัจจุบันออกอัตโนมัติ) */}
                <RelatedProducts
                    products={RELATED_PRODUCTS}
                    currentProductId={CURRENT_PRODUCT_ID}
                    className="mt-16"
                />

                {/* Reusable Component: สินค้าแนะนำทั่วไป */}
                <RecommendedProducts
                    products={RECOMMENDED_PRODUCTS}
                    className="mt-16"
                />

            </div>

            {/* Reusable Component: Footer ของเว็บไซต์ */}
            <ECommerceFooter />

        </div>
    )
}