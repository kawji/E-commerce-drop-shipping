'use client'
import { Phone ,ChevronDown ,ShoppingCart  } from 'lucide-react';
import Dropdown from '@/components/dropdown';
import {useTranslations} from 'next-intl';
import SearchIcon from '@/icons/search';
import AccountIcon from '@/icons/account';
import BtnNormal from '@/components/btnNormal';
import BtnSort from '@/components/btnSort';
import Image from 'next/image';
import ItemProduct from '@/components/itemProduct';
import BurgerIcon from '@/icons/burger';


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
        <div className="flex flex-col w-full items-center mb-50 ">
            
            <nav className="flex item-center justify-center w-full bg-[#0f3612] ">
                <div className='hidden lg:flex items-center justify-between w-full max-w-380 xl:mx-18 lg:mx-13 mx-10 py-2 text-white/83 text-[12px] lg:text-[13px] '>
                    <div className='flex gap-2 items-center '>
                        <Phone size={15} />
                        <p>+024 862 8685</p>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <p>{t('top-nav')}</p>      
                    </div>
                    <div className='flex items-center  gap-3'>
                        <div className='flex items-center gap-1'>
                            <p>Eng</p>
                            <ChevronDown size={15} />
                        </div>
                        <div className='flex items-center gap-1'>
                            <p>Location</p>
                            <ChevronDown size={15} />
                        </div>
                    </div>
                </div>
            </nav>
            <nav className='w-full flex items-center justify-center bg-zinc-50 static '>


                <div className='max-w-380 w-full flex items-center py-4 font-medium text-black/80 xl:mx-18 lg:mx-13 mx-10 lg:text-sm xl:text-base transition-all '>
                    <BurgerIcon className='flex lg:hidden w-5 h-5 mr-5 cursor-pointer hover:text-black/75 ' />
                    <p className='text-2xl text-[#0f3612] font-bold lg:mr-8 xl:mr-15 2xl:mr-25'>Shopcart</p>
                    <div className='hidden lg:flex shrink-0 items-center gap-5 2xl:gap-9 xl:gap-5  '>
                        <Dropdown namesec={t("nav-sec1")} section={t("dropdown-sec1")} itemsCategories={databaseItems} />
                        <BtnNormal namepages={"HomePage"} keytext={"nav-sec2"} />
                        <BtnNormal namepages={"HomePage"} keytext={"nav-sec3"} />
                        <BtnNormal namepages={"HomePage"} keytext={"nav-sec4"} />

                    </div>

                    <div className='flex items-center justify-end flex-1 gap-5 2xl:gap-9 xl:gap-5 text-black/80 lg:text-sm xl:text-base '>
                        <div className='relative flex items-center justify-center w-full ml-5 lg:ml-10 xl:ml-15  max-w-90'>
                            <input 
                            type="text"
                            placeholder='Search Product' 
                            className=' flex-1 outline-none text-sm bg-black/4 text-zinc-950/70 hidden sm:flex items-center px-5 py-2 rounded-2xl transition-all duration-300 ' 
                            
                            />
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 right-2 text-black/90 sm:text-[#7F8487] '  />
                        </div>
                        <button className='flex items-center justify-center shrink-0  gap-1 cursor-pointer hover:text-shadow-neutral-950 hover:text-black/70 transition-all duration-300'>
                            <ShoppingCart className='' size={15} />
                            <p>Cart</p>
                        </button>
                        <button className='flex items-center justify-center gap-1 cursor-pointer hover:text-shadow-neutral-950 hover:text-black/70 transition-all duration-300'>
                            <AccountIcon className='' />
                        </button>
                    </div>
                </div>
            </nav>

            <div className='max-w-380 h-77 w-full flex bg-amber-200/45 mt-1 px-20 '>
                <div className='flex-1 flex flex-col items-start justify-center gap-8'>
                    <h1 className='text-5xl text-[#0f3612] font-bold '>Grab Upto 50% Off On Selected Headphone</h1>
                    <button className='px-10 py-3 font-medium text-zinc-100/92 bg-[#0f3612] hover:bg-[#0f3612de] transition-colors rounded-4xl cursor-pointer '>Buy Now</button>
                </div>
                <div className='relative flex-1 flex items-center justify-end overflow-hidden '>
                    <Image
                    src="/pg/headphonegire.png"
                    fill
                    alt="Picture of the Heandphone"
                    sizes='100vw'
                    style={{
                        objectFit:'cover'
                    }}
                    className=' -translate-x-30 ' 
                    />
                </div>
            </div>

            <div className='flex items-center w-full max-w-380 bg-amber-100/5 mt-12 gap-4 '>

                <BtnSort sections='Headphone Type' />
                <BtnSort sections='Price' />
                <BtnSort sections='Review' />
                <BtnSort sections='Color' />
                <BtnSort sections='Meterial' />
                <BtnSort sections='Offer' />

                <button className='flex items-center px-3 py-1 rounded-2xl border border-black/12 ml-auto gap-2 font-semibold text-[13px] text-black/83 cursor-pointer hover:bg-black/10 transition-colors '>
                    <p>Sort by</p>
                    <ChevronDown size={15} className='text-black font-medium' />
                </button>
 
            </div>

            <div className='w-full max-w-380 flex items-center font-bold text-xl mt-6 text-black/90 '>
                <p>Headphones For You!</p>                
            </div>
            <div className='grid grid-cols-6 w-full max-w-380 gap-4 mt-5 '>
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
                <ItemProduct />
            </div>









        </div>
    )
}