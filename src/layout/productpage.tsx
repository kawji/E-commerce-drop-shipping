'use client'
import Navbar from "@/components/navbar"
import Image from "next/image"
import Staricon from "@/icons/star"
import SelectColor from "@/app/products/[id]/_components/selectColor"
import { useState } from "react"
import clsx from "clsx"

export default function ProductPage() {
    const [currentColor,setCurrentColor] = useState("red");
    const [countProduct,setCountProduct] = useState(1);
    const [limitCountProduct,setLimitCountProduct] = useState(12);

    const AVAILABLE_COLORS = [
        { id: "red", bg600: "bg-red-600", bg300: "bg-red-300" },
        { id: "blue", bg600: "bg-blue-600", bg300: "bg-blue-300" },
        { id: "green", bg600: "bg-emerald-600", bg300: "bg-emerald-300" },
        { id: "zinc", bg600: "bg-zinc-600/90", bg300: "bg-zinc-300" },
      ];


    return(
        <div className=" flex flex-col items-center w-full">
            <Navbar />
            <div className="flex flex-row w-full max-w-380 mt-8 ">
                <div className="flex flex-col w-[38%]  gap-4 ">
                    <div className="w-full relative flex items-center justify-center aspect-1.5/1.25 rounded-lg overflow-hidden bg-black/4 group hover:bg-black/7 cursor-zoom-in transition-all duration-300 ">
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
                    <div className=" py-7 border-b border-b-black/8  flex items-center  ">

                        <div className="grid grid-cols-3 aspect-3.75/1 w-38 bg-black/3 rounded-full ">
                            <button className={clsx("flex items-center justify-center w-full h-full text-xl cursor-pointer scale-130 hover:scale-170 transition-all duration-300 "
                                ,countProduct === 1 ? "opacity-40":"opacity-100"
                            )}
                                onClick={() => setCountProduct((prev) => {
                                    if(prev > 1) {
                                        return prev-1
                                    }
                                    return prev
                                })}
                            >-</button>
                            <div className="flex items-center justify-center w-full h-full text-base ">{countProduct}</div>
                            <button className={clsx("flex items-center justify-center w-full h-full text-xl cursor-pointer scale-130 hover:scale-170 transition-all duration-300 "
                                ,countProduct === limitCountProduct ? "opacity-40":"opacity-100"
                            )}
                            onClick={() => setCountProduct((prev) => {
                                if(prev < limitCountProduct) {
                                    return prev + 1
                                }
                                return prev
                            })}

                            >+</button>

                        </div>




                    </div>




                </div>

            </div>
        
        </div>
    )
}