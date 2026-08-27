'use client'
import { Phone,ChevronDown  } from 'lucide-react';
import Dropdown from '@/components/dropdown';
import {useTranslations} from 'next-intl';
import SearchIcons from '@/components/icons/search';

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
        <div className="flex flex-col w-full ">
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
            <nav className='w-full flex items-center justify-center '>


                <div className='max-w-380 w-full flex items-center gap-9 py-4  '>
                    <p className='text-2xl text-[#0f3612] font-bold mr-17'>Shopcart</p>
                    <Dropdown namesec={t("nav-sec1")} section={t("dropdown-sec1")} itemsCategories={databaseItems} />
                    <button className='font-medium text-black/90 '>{t("nav-sec2")}</button>
                    <button className='font-medium text-black/90 '>{t("nav-sec3")}</button>
                    <button className='font-medium text-black/90 '>{t("nav-sec4")}</button>

                    <div className='flex items-center flex-1 '>
                        <div className='relative '>
                            <input type="text" placeholder='Search Product' className='flex-1 max-w-88 outline-none text-sm bg-black/4  flex items-center px-3 py-2 rounded-2xl ' />
                            <SearchIcons className='absolute top-1/2 -translate-y-1/2 right-2 '  />
                        </div>

                    </div>

                </div>



            </nav>









        </div>
    )
}