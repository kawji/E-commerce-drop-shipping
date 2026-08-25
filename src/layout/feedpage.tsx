'use client'
import { useState } from 'react';
import { Phone,ChevronDown  } from 'lucide-react';
import ItemCategories from '@/components/itremCategories';
import clsx from 'clsx';

export default function Feedpage() {
    
    const sections = ['ไทย','Eng']

    const [categories,setCategories] = useState(false)

    console.log('cat -->',categories)

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
                    <div className='flex relative bg-amber-300 h-4  '>
                        <div className="flex items-center gap-2 font-medium cursor-pointer text-black/90 hover:text-black/70 transition-all duration-300"
                        onMouseEnter={()=> setCategories(true)}
                        >
                            <p>Categories</p>
                            <ChevronDown size={20} className='text-black/72  ' />
                        </div>

                        <div className={clsx('absolute z-2 top-8  w-169 flex flex-col items-start  border border-black/8 py-2 px-5 rounded-md transition-all duration-150 '
                            ,categories? 'opacity-100 scale-100 pointer-events-auto':'opacity-0 scale-95 pointer-events-none'
                        )}
                        onMouseLeave={() => setCategories(false)}
                        >
                            <div className='flex items-center py-4 w-full text-xl font-bold text-zinc-950/88 border-b border-b-black/10 mb-6 '>
                                Popular Categories
                            </div>
                            
                            <div className='grid grid-cols-2 gap-x-6 gap-y-5 w-full '>
                                <ItemCategories  />
                                <ItemCategories />
                                <ItemCategories />
                                <ItemCategories />
                                <ItemCategories />
                                <ItemCategories />
                            </div>
                        </div>


                    </div>
                </div>



            </nav>









        </div>
    )
}