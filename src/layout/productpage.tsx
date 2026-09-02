'use client'
import Navbar from "@/components/navbar"
import Image from "next/image"
import Staricon from "@/icons/star"


export default function ProductPage() {

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
                        <p className="font-medium text-sm text-black/60  ">a perfect balance of exhilarating hifh-fidelity audio and the effortiess magic of AirPods.</p>
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
                        <p className="font-medium text-sm text-black/60  ">a perfect balance of exhilarating.</p>
                    </div>
                    <div className="flex flex-col py-7 border-b border-b-black/8 gap-3 ">
                        <h1 className="font-bold text-2xl text-zinc-950/88 leading-relaxed">Choose a Color</h1>
                        <div className="flex items-center gap-3 ">

                            <div className=" flex items-center justify-center rounded-full aspect-square w-10 border-[1.5px] border-green-900 p-0.75 ">
                                <div className="flex flex-col items-center justify-center rounded-full w-full h-full overflow-hidden ">
                                    <span className="flex flex-1 w-full  bg-cyan-600/90"></span>
                                    <span className="flex flex-1 w-full  bg-cyan-300"></span>
                                </div>
                            </div>
                            <div className=" flex items-center justify-center rounded-full aspect-square w-10 border-[1.5px] border-green-900/0 p-0.75 ">
                                <div className="flex flex-col items-center justify-center rounded-full w-full h-full overflow-hidden ">
                                    <span className="flex flex-1 w-full  bg-red-600/90"></span>
                                    <span className="flex flex-1 w-full  bg-red-300"></span>
                                </div>
                            </div>
                            <div className=" flex items-center justify-center rounded-full aspect-square w-10 border-[1.5px] border-green-900/0 p-0.75 ">
                                <div className="flex flex-col items-center justify-center rounded-full w-full h-full overflow-hidden ">
                                    <span className="flex flex-1 w-full  bg-green-600/90"></span>
                                    <span className="flex flex-1 w-full  bg-green-300"></span>
                                </div>
                            </div>
                            <div className=" flex items-center justify-center rounded-full aspect-square w-10 border-[1.5px] border-green-900/0 p-0.75 ">
                                <div className="flex flex-col items-center justify-center rounded-full w-full h-full overflow-hidden ">
                                    <span className="flex flex-1 w-full  bg-zinc-600/90"></span>
                                    <span className="flex flex-1 w-full  bg-zinc-300"></span>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        
        </div>
    )
}