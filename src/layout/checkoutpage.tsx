


import Navbar from "@/components/navbar"
import Image from "next/image"

export default function CheckoutLayoutPage() {

    return(
        <div className="flex flex-col pb-50 w-full  items-center ">
            <Navbar />
            <div className="flex w-full max-w-380  ">
                <div className="flex flex-col items-center  flex-1 h-250 border pt-8">
                    
                    <div className="flex flex-col w-[70%] border border-black/6  shadow-xs rounded-md bg-zinc-50 px-7 py-5 gap-5 ">
                        <h1 className=" font-semibold text-2xl text-zinc-950/92 ">Review Item And Shipping</h1>
                        <div className=" flex items-center gap-5 ">
                            <div className="flex items-center w-35 bg-black/4  justify-center rounded overflow-hidden relative h-full aspect-square ">
                                <Image 
                                src={"/pg/headphone1-.png"}
                                alt="png headphone in check out"
                                width={100}
                                height={100}
                                className=" object-cover "
                                />
                            </div>
                            <div className=" flex items-center justify-between flex-1 ">
                                <div className=" flex items-start  flex-col ">
                                    <h1 className="leading-relaxed text-2xl font-bold text-zinc-950/90  ">Airpods-Max</h1>
                                    <p className="text-[13px] text-black/45 font-semibold ">Color:Pink</p>
                                </div>
                                <div className=" flex items-end text-end  flex-col ">
                                    <h1 className="leading-relaxed text-base font-semibold text-zinc-950/90  ">$549.00</h1>
                                    <p className="text-[13px] text-black/77 font-semibold ">Quantity: 01</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className=" flex w-[30%] bg-amber-100/4 h-250 border ">

                </div>
            </div>
        </div>  

    )
}