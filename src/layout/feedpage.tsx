'use client'
import { useState ,useEffect ,useRef } from 'react';
import { Phone,ChevronDown  } from 'lucide-react';
import ItemCategories from '@/components/itremCategories';
import clsx from 'clsx';

import Dropdown from '@/components/dropdown';

type databaseItemsType = [string,number][]

export default function Feedpage() {
    
    const sections = ['ไทย','Eng']

    const databaseItems:databaseItemsType = [["Headphone",240],["Computer",200],["phone",150],["Mouse",90]]

    return(
        <div className="flex flex-col w-full ">
            <nav className="flex item-center justify-center w-full bg-[#0f3612] ">
                <div className='flex items-center justify-between w-full max-w-380 py-2 text-white/83 text-[13px] '>
                    <div className='flex gap-2 items-center '>
                        <Phone size={15} />
                        <p>+024 862 8685</p>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <p>Get 50% Off on Selected Items   |   Shop Now</p>      
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex gap-2'>
                            <p>Eng</p>
                            <ChevronDown />
                        </div>
                        <div className='flex gap-2'>
                            <p>Location</p>
                            <ChevronDown />
                        </div>
                    </div>
                </div>
            </nav>
            <nav className='w-full flex items-center justify-center '>


                <div className='max-w-380 w-full flex items-center gap-5 py-4  '>

                    <p className='text-2xl text-[#0f3612] font-bold mr-10'>Shopcart</p>
                    <Dropdown section='Popular Categories' itemsCategories={databaseItems} />
                </div>



            </nav>









        </div>
    )
}