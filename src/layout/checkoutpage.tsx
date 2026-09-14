
'use client'

import { type LucideIcon } from 'lucide-react';
import Navbar from "@/components/navbar"
import Image from "next/image"
import SectonInformation from "@/app/checkout/_components/sectionsInformation"
import { useState } from "react"
import RadioPay from "@/app/checkout/_components/radioPay"
import VisaIcon from "@/icons/visa"
import ItemPay from "@/app/checkout/_components/itemPay"
import { iconList ,type IconName } from '@/icons/iconsList';

type ItemsPay = {
    icon:IconName;
    title:string;
}

export default function CheckoutLayoutPage() {

    const [checkout,setCheckout] = useState('delivery');
    const [currentPay,setCurrentPay] = useState('visa');

    const dataItemsPay:ItemsPay[] = [
        {icon:'visa' ,title:"visa"},
        {icon:'prom' ,title:"prompay"},
        {icon:'credit' ,title:"credit"},
    ]

    console.log("----->", checkout)

    return(
        <div className="flex flex-col pb-50 w-full  items-center text-zinc-950/90 ">
            <Navbar />
            <div className="flex flex-row items-start justify-center w-full max-w-380  gap-5 xl:px-18 lg:px-13 px-10 ">

                <div className="flex flex-col items-center  w-full max-w-170 pt-8  gap-5 ">
                    
                    <div className="flex flex-col w-full border border-black/6  shadow-xs rounded-md bg-zinc-50 px-7 py-5 gap-5 ">
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
                <div className=" flex w-full max-w-105 pt-8 ">
                    <div className=" flex flex-col w-full items-start  px-7 py-5 bg-zinc-50 border border-black/6 rounded-md text-zinc-950/90 gap-0 ">
                        <h1 className=" text-2xl font-bold   ">Order Summery</h1>
                        <div className=" relative w-full flex items-center  py-7 border-t border-t-black/6 mt-4">
                            <input 
                            type="text" 
                            name="" 
                            id="" 
                            placeholder="EnterCoupon Code" 
                            className="px-4.5 py-3 w-full rounded-full text-[13px] bg-black/4 outline-none " 
                            />
                            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 flex items-center justify-center rounded-full bg-[#0f3612de] text-zinc-50/90 cursor-pointer text-[13px] font-medium  ">
                                Apply coupon
                            </button>
                        </div>
                        <div className=" flex flex-col items-start gap-3 justify-start w-full py-4 border-t border-t-black/6 ">
                            <div className="text-xl font-bold leading-relaxed w-full ">Payment Details</div>

                            <RadioPay currentPay={checkout} section="Cash on Delivery" setCurrentPay={setCheckout} value="delivery" />
                            <RadioPay currentPay={checkout} section="Shopcart Card" setCurrentPay={setCheckout} value="card" />
                            <RadioPay currentPay={checkout} section="Paypal" setCurrentPay={setCheckout} value="paypal" />
                        </div>
                        <div className=" flex flex-row  items-center mt-0 gap-2 ">
                            {dataItemsPay.map((i)=> {
                                return(
                                    <ItemPay icon={i.icon} title={i.title} currentSelect={currentPay} onCurrentSelect={setCurrentPay} />
                                )
                            })}
                        </div>



                    </div>

                </div>
            </div>
        </div>  

    )
}