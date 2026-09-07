


import Navbar from "@/components/navbar"
import Image from "next/image"
import SectonInformation from "@/app/checkout/_components/sectionsInformation"


export default function CheckoutLayoutPage() {

    return(
        <div className="flex flex-col pb-50 w-full  items-center text-zinc-950/90 ">
            <Navbar />
            <div className="flex flex-row items-start justify-center w-full max-w-380  gap-5 xl:px-18 lg:px-13 px-10 ">

                <div className="flex flex-col items-center  w-full max-w-170 h-250 pt-8  gap-5 ">
                    
                    <div className="flex flex-col w-full  border border-black/6  shadow-2xs rounded-md bg-zinc-50 px-7 py-5 gap-5 ">
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

                    <div className="flex flex-col w-full bg-zinc-50 border border-black/6 rounded-md px-7 py-5 gap-5 shadow-2xs ">
                        <div className=" flex items-cneter ">
                            <h1 className=" text-2xl font-bold text-zinc-950/90 ">
                                Delivery Information
                            </h1>
                            <div className="flex items-center justify-center rounded-full bg-black/9  font-semibold text-[13px] px-3 py-1 ml-auto ">
                                Edit Information
                            </div>
                        </div>
                        <div className="flex flex-col items-start text-zinc-950/90 gap-4 ">
                            <SectonInformation section="Name" data="Wade Warren" />
                            <SectonInformation section="Address" data="4140 Parker Rd. Allentown,New Mexico 31134" />
                            <SectonInformation section="City" data="Austin" />
                            <SectonInformation section="Zip Code" data="85486" />
                            <SectonInformation section="Mobile" data="+447700960054" />
                            <SectonInformation section="Email" data="georgia.young@example.com" />
                        </div>

                    </div>

                </div>
                <div className=" flex w-[30%] bg-amber-100/40 h-250 border ">

                </div>
            </div>
        </div>  

    )
}