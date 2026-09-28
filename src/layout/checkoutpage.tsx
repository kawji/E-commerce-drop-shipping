
'use client'

import { type LucideIcon } from 'lucide-react';
import Navbar from "@/components/navbar"
import Image from "next/image"
import SectionInformation from "@/app/checkout/_components/sectionsInformation"
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
            <div className="flex flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-center w-full max-w-380  gap-5 xl:px-18 lg:px-13 px-5 ">

                <div className="flex flex-col items-center  w-full max-w-170 pt-8  gap-5 ">
                    <div className="w-full border border-black/5 shadow-xs rounded-lg bg-zinc-50 px-4 py-4 sm:px-7 sm:py-5 flex flex-col gap-4 sm:gap-5">
                        <h1 className="font-bold text-lg sm:text-2xl text-zinc-950/92">
                            Review Item And Shipping
                        </h1>
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="relative shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-black/4 rounded overflow-hidden aspect-square flex items-center justify-center">
                                <Image 
                                    src={"/pg/headphone1-.png"}
                                    alt="png headphone in check out"
                                    fill
                                    sizes="(max-width: 640px) 96px, 128px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between grow gap-2 sm:gap-4 self-stretch justify-center">
                                <div className="flex flex-col">
                                    <h2 className="text-base sm:text-2xl font-semibold text-zinc-950/90 leading-tight sm:leading-relaxed">
                                        Airpods-Max
                                    </h2>
                                    <p className="text-xs sm:text-sm text-black/45 font-medium mt-0.5">
                                        Color: Pink
                                    </p>
                                </div>
                                <div className="flex flex-row sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-2 mt-1 sm:mt-0 pt-2 sm:pt-0 border-t border-black/5 sm:border-none">
                                    <span className="text-base sm:text-xl font-bold text-zinc-950/90">
                                        $549.00
                                    </span>
                                    <span className="text-xs sm:text-sm text-black/77 font-medium">
                                        Quantity: 01
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col w-full bg-zinc-50 border border-black/6 rounded-md p-4 sm:px-7 sm:py-5 gap-5 shadow-2xs">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                            <h1 className="text-lg sm:text-2xl font-bold text-zinc-950/90">
                                Delivery Information
                            </h1>
                            <button className="flex items-center justify-center rounded-full bg-black/9 font-semibold text-xs sm:text-sm px-4 py-1.5 sm:py-1 self-start sm:self-auto cursor-pointer transition-colors hover:bg-black/15">
                                Edit Information
                            </button>
                        </div>
                        <div className="flex flex-col items-start text-zinc-950/90 gap-3 sm:gap-4 w-full">
                            <SectionInformation section="Name" data="Wade Warren" />
                            <SectionInformation section="Address" data="4140 Parker Rd. Allentown, New Mexico 31134" />
                            <SectionInformation section="City" data="Austin" />
                            <SectionInformation section="Zip Code" data="85486" />
                            <SectionInformation section="Mobile" data="+447700960054" />
                            <SectionInformation section="Email" data="georgia.young@example.com" />
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-170 lg:max-w-135 pt-4 sm:pt-8">
                    <div className="flex flex-col w-full items-start p-4 sm:px-7 sm:py-5 bg-zinc-50 border border-black/6 rounded-md text-zinc-950/90 gap-4">
                        
                        <h1 className="text-xl sm:text-2xl font-bold">Order Summary</h1>
                        
                        <div className="w-full flex flex-col sm:flex-row sm:items-center py-5 sm:py-4 border-y border-y-black/6 gap-2 sm:gap-0 sm:relative">
                            <input 
                                type="text" 
                                name="coupon" 
                                id="coupon" 
                                placeholder="Enter Coupon Code" 
                                className="px-4.5 py-3 w-full rounded-full text-[13px] bg-black/4 outline-none sm:pr-32" 
                            />
                            <button className="w-full sm:w-auto sm:absolute sm:right-1.5 sm:top-1/2 sm:-translate-y-1/2 px-4 py-2.5 sm:py-1.5 flex items-center justify-center rounded-full bg-[#0f3612de] text-zinc-50/90 cursor-pointer text-[13px] font-medium transition-colors hover:bg-[#0f3612f0]">
                                Apply coupon
                            </button>
                        </div>

                        <div className="flex flex-col items-start gap-3 justify-start w-full py-0">
                            <div className="text-lg sm:text-xl font-bold leading-relaxed w-full">Payment Details</div>
                            <RadioPay currentPay={checkout} section="Cash on Delivery" setCurrentPay={setCheckout} value="delivery" />
                            <RadioPay currentPay={checkout} section="Shopcart Card" setCurrentPay={setCheckout} value="card" />
                            <RadioPay currentPay={checkout} section="Paypal" setCurrentPay={setCheckout} value="paypal" />
                        </div>

                        <div className="flex flex-row flex-wrap items-center mt-2 gap-2 w-full">
                            {dataItemsPay.map((i)=> {
                                return(
                                    <ItemPay key={i.title} icon={i.icon} title={i.title} currentSelect={currentPay} onCurrentSelect={setCurrentPay} />
                                )
                            })}
                        </div>
                    
                        <div className='flex flex-col w-full gap-2 text-sm font-semibold '>
                            <span>Email*</span>
                            <input type="text" placeholder='Type here...'
                            className='px-4.5 py-3 outline-none border border-black/6 rounded font-normal focus:border-black/30 transition-all '
                            />
                        </div>

                        <div className='flex flex-col w-full gap-2 text-sm font-semibold '>
                            <span>Card Holder Name*</span>
                            <input type="text" placeholder='Type here...'
                            className='px-4.5 py-3 outline-none border border-black/6 rounded font-normal focus:border-black/30 transition-all '
                            />
                        </div>
                    
                    </div>

                </div>

            </div>
        </div>  

    )
}