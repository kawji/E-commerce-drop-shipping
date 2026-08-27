'use client'
import { Phone ,ChevronDown ,ShoppingCart  } from 'lucide-react';
import Dropdown from '@/components/dropdown';
import {useTranslations} from 'next-intl';
import SearchIcon from '@/components/icons/search';
import AccountIcon from '@/components/icons/account';
import BtnNormal from '@/components/btnNormal';
import Image from 'next/image';

type databaseItemsType = [string,string,number][]

export default function Feedpage() {
    
    const t = useTranslations('HomePage');

    const databaseItems:databaseItemsType = [
        ['/itemHeadphone.jpg',"Headphone",240],
        ['/itemHeadphone.jpg',"Computer",850],
        ['/itemHeadphone.jpg',"Computer",230],
        ['/itemHeadphone.jpg',"Computer",190],
        ['/itemHeadphone.jpg',"phone",150],
        ['/itemHeadphone.jpg',"Mouse",90]
    ]

    return(
        <div className="flex flex-col w-full items-center ">
            
            <nav className="flex item-center justify-center w-full bg-[#0f3612] ">
                <div className='flex items-center justify-between w-full max-w-380 py-2 text-white/83 text-[13px] '>
                    <div className='flex gap-2 items-center '>
                        <Phone size={15} />
                        <p>+024 862 8685</p>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <p>{t('top-nav')}</p>      
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
            <nav className='w-full flex items-center justify-center bg-zinc-50 static '>


                <div className='max-w-380 w-full flex items-center gap-0 py-4 font-medium text-black/80 '>
                    <p className='text-2xl text-[#0f3612] font-bold mr-25'>Shopcart</p>
                    <div className='flex items-center gap-9'>
                        <Dropdown namesec={t("nav-sec1")} section={t("dropdown-sec1")} itemsCategories={databaseItems} />
                        <BtnNormal namepages={"HomePage"} keytext={"nav-sec2"} />
                        <BtnNormal namepages={"HomePage"} keytext={"nav-sec3"} />
                        <BtnNormal namepages={"HomePage"} keytext={"nav-sec4"} />

                    </div>

                    <div className='flex items-center justify-end flex-1 gap-9 text-black/80 '>
                        <div className='relative flex items-center justify-center w-full max-w-90'>
                            <input 
                            type="text"
                            placeholder='Search Product' 
                            className='flex-1 outline-none text-sm bg-black/4 text-zinc-950/70 flex items-center px-5 py-2 rounded-2xl transition-all duration-300 ' 
                            
                            />
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 right-2 '  />
                        </div>
                        <button className='flex items-center justify-center gap-1 cursor-pointer hover:text-shadow-neutral-950 hover:text-black/70 transition-all duration-300'>
                            <AccountIcon className='' />
                            <p>Account</p>
                        </button>

                        <button className='flex items-center justify-center  gap-1 cursor-pointer hover:text-shadow-neutral-950 hover:text-black/70 transition-all duration-300'>
                            <ShoppingCart className='' size={20} />
                            <p>Cart</p>
                        </button>
                    </div>
                </div>
            </nav>

            <div className='max-w-380 h-77 w-full flex bg-amber-200/40 mt-1 px-20 '>
                <div className='flex-1 flex flex-col items-start justify-center gap-10'>
                    <h1 className='text-5xl text-[#0f3612] font-bold '>Grab Upto 50% Off On Selected Headphone</h1>
                    <button className='px-10 py-3 font-medium text-zinc-100/92 bg-[#0f3612] rounded-4xl '>Buy Now</button>


                </div>
                <div className='flex-1 flex items-center justify-end overflow-hidden '>
                    <Image
                    src="/pg/heroHomePG.png"
                    width={480}
                    height={480}
                    alt="Picture of the Heandphone"
                    className='bg-blue-400/0 mr-30 '
                    />
                </div>

            </div>









        </div>
    )
}