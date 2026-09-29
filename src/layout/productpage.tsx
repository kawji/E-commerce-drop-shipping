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
        <div className="flex flex-col items-center w-full pb-20 md:pb-32 2xl:pb-50 bg-zinc-50">
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



                <div className="flex flex-col gap-6 text-black/90 w-full mt-8 px-6 py-10 bg-zinc-50 shadow-xs border border-black/5 rounded ">
                    <div className="flex flex-col w-full text-base text-black/70 bg-black/0 py-3 ">
                        This product has no reviews yet.
                    </div>

                    <div className="flex flex-col w-full gap-3 ">
                        <div className="w-full flex items-center text-2xl font-semibold border-b border-b-black/10 pb-3 ">Product Details</div>
                        <div className="flex flex-col w-full py-3 ">
                            <div className="w-full text-sm font-medium  ">
                                ไฮไลท์<br/><br/>
                                Aconatic ทีวี 24 นิ้ว LED HD Digital TV รุ่น 24HD523AN ดิจิตอลทีวี (รับประกัน 1 ปี) <br/>
                                    ขนาดหน้าจอ (นิ้ว) : 24 <br/>
                                    Resolution : HD 1366 x 768  <br/>
                                    Brightness (Typ) : 150cd/m2 <br/>
                                    Contrast Ratio(Min/Typ)  : 800:1 <br/>
                                    Response Time : 8ms <br/>
                                    Audio Power : 3W x2 <br/>
                                    Power Supply : 100V-240V, 50/60Hz <br/>
                                    การใช้พลังงาน (โหมด ON/มาตรฐาน) : 40W <br/>
                                    การใช้พลังงาน (สแตนด์บาย) : 0.50W <br/>
                                    ขนาดสินค้า (กว้าง x ยาว x สูง) : 550 x 147 x 365 mm. <br/>
                                    น้ำหนักสินค้า : 4.1 kg. <br/>
                                    ขนาดรวมแพ็คเกจ : 600 x 102 x 395 mm. <br/>
                                    น้ำหนักรวมแพ็คเกจ : 5.6 kg. <br/>
                                    HDMI : 1 <br/>
                                    USB : 1 <br/>
                                    RF : 1 <br/>
                                    CVBS/AUDIO IN : 1 <br/>
                                    Optical : 1 <br/>
                                    Earphone (3.5mm) : 1 <br/>
                            </div>

                        </div>
                    </div>
                    

                </div>











            </div>

        </div>
    )
}
