'use client'
import Navbar from "@/components/navbar"
import Image from "next/image"
import Staricon from "@/icons/star"
import SelectColor from "@/app/products/[id]/_components/selectColor"
import { useState } from "react"
import clsx from "clsx"
import ButtonCount from "@/app/products/[id]/_components/buttonCount"
import { Truck,Album } from 'lucide-react';
import TagProduct from "@/app/products/[id]/_components/tagProduct"
import { TagProductType } from "@/app/products/[id]/type/typeTag"
import Link from "next/link"









export default function ProductPage() {
    const [currentColor,setCurrentColor] = useState("red");
    const [limitCountProduct,setLimitCountProduct] = useState(12);

    const AVAILABLE_COLORS = [
        { id: "red", bg600: "bg-red-600", bg300: "bg-red-300" },
        { id: "blue", bg600: "bg-blue-600", bg300: "bg-blue-300" },
        { id: "green", bg600: "bg-emerald-600", bg300: "bg-emerald-300" },
        { id: "zinc", bg600: "bg-zinc-600/90", bg300: "bg-zinc-300" },
    ];

    const DATA_TAG_PRODUCT:TagProductType[] = [
        {icon:Truck,section:"Free Delivery",word1:'',underword1:"Enter your Postal code for Delivery Availability",word2:'',underword2:"",word3:'',underword3:'' ,space:"gap-0"},
        {icon:Album,section:"Return Delivery",word1:"Free 30day Delivery Returns.",underword1:" Details",word2:'',underword2:"",word3:'',underword3:'',space:"gap-1"},
    ]


    return(
        <div className=" flex flex-col items-center w-full pb-50 ">
            <Navbar />
            <div className="flex flex-row w-full max-w-380 mt-8 ">
                <div className="flex flex-col w-[39%]  gap-4 ">
                    <div className="w-full relative flex items-center justify-center aspect-1.5/1.5 rounded-lg overflow-hidden bg-black/4 group hover:bg-black/7 cursor-zoom-in transition-all duration-300 ">
                        <Image
                        src={"/pg/headphone1-.png"}
                        alt="product headphone"
                        width={420}
                        height={420}
                        className="object-cover group-hover:scale-103 trnasition-all duration-300 "
                        />
                    </div>
                    <div className="w-full h-30  grid grid-cols-4 gap-4 ">
                        <div className="w-full h-full group aspect-square flex items-center justify-center rounded overflow-hidden relative bg-black/4 cursor-pointer hover:bg-black/7 trnasition-all duration-300 ">
                            <Image 
                            src={"/pg/headphone1-.png"}
                            width={80}
                            height={80}
                            className="object-cover group-hover:scale-125 transition-all duration-300 "
                            alt="picture headphone"
                            />
                        </div>
                        <div className="w-full h-full group aspect-square flex items-center justify-center rounded overflow-hidden relative bg-black/4 cursor-pointer hover:bg-black/7 trnasition-all duration-300 ">
                            <Image 
                            src={"/pg/headphone1-.png"}
                            width={80}
                            height={80}
                            className="object-cover group-hover:scale-125 transition-all duration-300 "
                            alt="picture headphone"
                            />
                        </div>
                        <div className="w-full h-full group aspect-square flex items-center justify-center rounded overflow-hidden relative bg-black/4 cursor-pointer hover:bg-black/7 trnasition-all duration-300 ">
                            <Image 
                            src={"/pg/headphone1-.png"}
                            width={80}
                            height={80}
                            className="object-cover group-hover:scale-125 transition-all duration-300 "
                            alt="picture headphone"
                            />
                        </div>
                        <div className="w-full h-full group aspect-square flex items-center justify-center rounded overflow-hidden relative bg-black/4 cursor-pointer hover:bg-black/7 trnasition-all duration-300 ">
                            <Image 
                            src={"/pg/headphone1-.png"}
                            width={80}
                            height={80}
                            className="object-cover group-hover:scale-125 transition-all duration-300 "
                            alt="picture headphone"
                            />
                        </div>
                    </div>

                </div>
                <div className="flex flex-col flex-1 bg-black/0 px-15 text-zinc-950">
                    <div className="flex flex-col bg-black/0 pb-7 border-b border-b-black/8  ">
                        <h1 className="font-bold text-4xl leading-relaxed">Airpods-Max</h1>
                        <p className="font-medium text-base text-black/60  ">a perfect balance of exhilarating hifh-fidelity audio and the effortiess magic of AirPods.</p>
                        <div className='flex items-center mt-1 gap-1 '>
                            <Staricon className='text-green-500' />
                            <Staricon className='text-green-500' />
                            <Staricon className='text-green-500' />
                            <Staricon className='text-green-500' />
                            <Staricon className='text-green-500' />
                            <p className='text-[12px] ml-1 text-black/77 '>(121)</p>
                        </div>
                    
                    </div>
                    <div className="flex flex-col py-7 border-b border-b-black/8 ">
                        <h1 className="font-bold text-2xl text-zinc-950/88 leading-relaxed">$549.00 or 99.99/month</h1>
                        <p className="font-medium text-base text-black/60  ">a perfect balance of exhilarating.</p>
                    </div>
                    <div className="flex flex-col py-7 border-b border-b-black/8 gap-3 ">
                        <h1 className="font-bold text-2xl text-zinc-950/88 leading-relaxed">Choose a Color</h1>
                        <div className="flex items-center gap-3 ">
                            {AVAILABLE_COLORS.map((color)=> {
                                return(
                                    <SelectColor colorName={color.id}  color600={color.bg600} color300={color.bg300} select={color.id === currentColor} onSelect={setCurrentColor} key={color.id} />
                                )
                            })}

                        </div>
                    </div>

                    <div className="flex flex-col py-7  gap-5 ">
                        <div className=" flex items-center gap-10 ">
                            <ButtonCount limit={limitCountProduct} />
                            <div className="flex flex-col text-sm font-medium text-zinc-950/90 ">
                                <span className="flex items-center gap-1 ">
                                    <p>Only </p> 
                                    <p className="text-yellow-600/90 gap-1"> {limitCountProduct} items </p>
                                    <p>Left! </p>
                                </span>
                                <span>Don't miss it</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 ">
                            <Link href={'/checkout'} className="flex items-center justify-center px-18 py-2.75 rounded-full bg-[#0f3612] text-zinc-100/90 hover:bg-[#0f3612e5] transition-all duration-300 cursor-pointer  ">Buy Now</Link>
                            <button className="flex items-center justify-center px-18 py-2.75 rounded-full bg-zinc-50 border border-[#0f3612a4] text-[#0f3612a4] hover:bg-zinc-200/45 transition-all duration-300 cursor-pointer  ">Add to Cart</button>
                        </div>
                    
                        <div className="flex flex-col w-full max-w-110 border-x border-t border-x-black/6 border-t-black/6 shadow-2xs rounded-md overflow-hidden mt-3 ">
                        
                            {DATA_TAG_PRODUCT.map((i) => {
                                return(
                                    <TagProduct 
                                    icon={i.icon} 
                                    section={i.section} 
                                    word1={i.word1} 
                                    underword1={i.underword1} 
                                    word2={i.word2 }
                                    underword2={i.underword2} 
                                    word3={i.word3} 
                                    underword3={i.underword3} 
                                    space={i.space}
                                    key={i.section}
                                    />
                                )
                            })}

                        </div>
                    </div>


                </div>

            </div>
        
        </div>
    )
}