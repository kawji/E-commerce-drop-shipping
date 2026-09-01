'use client'
import Navbar from "@/components/navbar"
import Image from "next/image"

export default function ProductPage() {

    return(
        <div className=" flex flex-col items-center w-full">
            <Navbar />
            <div className="flex flex-row items-center w-full max-w-380 mt-8 ">
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
                <div className="flex flex-col flex-1 bg-amber-400">

                </div>

            </div>
        
        </div>
    )
}