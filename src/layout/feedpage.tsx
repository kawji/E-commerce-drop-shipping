'use client'
import { Phone ,ChevronDown ,ShoppingCart  } from 'lucide-react';
import {useTranslations} from 'next-intl';
import BtnSort from '@/components/btnSort';
import Image from 'next/image';
import ItemProduct from '@/components/itemProduct';
import { DataProduct } from '@/type/datatype';
import Navbar from '@/components/navbar';


export default function Feedpage() {
    
    const t = useTranslations('HomePage');



    const databaseProducts:DataProduct[] = [
        {id:"headphone1",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone2",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone3",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone4",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone5",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone6",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone7",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone8",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone9",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone10",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphon11",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone12",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
        {id:"headphone13",src:"/pg/headphone1-.png",section:"Bose BT Earphones",description:"Table with air purifier, stained venner/black",price:283,popular:120},
    ]

    return(
        <div className="flex flex-col w-full items-center mb-50  ">
            
            <Navbar />

            <div className='max-w-380 relative h-55 sm:h-63 lg:h-77 w-full flex bg-amber-200/45 mt-1 lg:px-15 xl:px-18 '>
                <div className='flex-1 flex flex-col items-center md:items-start text-center justify-center gap-5 lg:gap-8 md:pl-10 '>
                    <h1 className='lg:text-5xl md:text-4xl text-[8vw] leading-none sm:text-5xl text-wrap md:text-nowrap text-[#0f3612] font-bold text-start '>{t("carousel-t-hero")} <br/>{t("carousel-b-hero")}</h1>
                    <button className='md:px-10 md:py-3 py-2.5 sm:px-8 px-6 text-sm md:text-base font-medium text-zinc-100/92 bg-[#0f3612] hover:bg-[#0f3612de] transition-colors rounded-4xl cursor-pointer '>Buy Now</button>
                </div>
                <div className='md:relative min-w-90  hidden lg:flex-1 shrink-0 md:flex items-center overflow-hidden '>
                    <Image
                    src="/pg/headphonegire.png"
                    fill
                    sizes='auto'
                    alt="Picture of the Heandphone"
                    className=' object-cover object-right shrink-0  ' 
                    />
                </div>
            </div>
            <div className='w-full  flex justify-center xl:px-18 lg:px-13 px-10'>
                <div className='flex items-center w-full max-w-380  mt-12 gap-4    '>
                    <div className='flex items-center flex-wrap gap-4'>
                        <BtnSort sections='Headphone Type' classStyle='sm:flex hidden' />
                        <BtnSort sections='Price' classStyle='sm:flex hidden' />
                        <BtnSort sections='Review' classStyle='sm:flex hidden' />
                        <BtnSort sections='Color' classStyle='sm:flex hidden' />
                        <BtnSort sections='Meterial' classStyle='sm:flex hidden' />
                        <BtnSort sections='Offer' classStyle='sm:flex hidden' />
                        <BtnSort sections='All Filters' iconFillter={true} classStyle='sm:hidden' />
                    </div>
                    <button className='flex shrink-0 items-center px-3 py-1 rounded-2xl border border-black/12 ml-auto gap-2 font-semibold text-[13px] text-black/83 cursor-pointer hover:bg-black/10 transition-colors '>
                        <p>Sort by</p>
                        <ChevronDown size={15} className='text-black font-medium' />
                    </button>

                </div>

            </div>


            <div className='flex flex-col items-center w-full xl:px-18 lg:px-13 px-10 '>
                <div className=' w-full max-w-380 flex items-center font-bold text-xl mt-6 text-black/90 '>
                    <p>Headphones For You!</p>                
                </div>
                <div className=' grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-2 grid-cols-1  w-full max-w-380 gap-4 mt-5 '>
                    {
                        databaseProducts.map((i) => {
                            return(
                                <ItemProduct id={i.id} src={i.src} section={i.section} description={i.description} popular={i.popular} price={i.price} scrap={i.scrap} key={i.id} />
                            )
                        })
                    }
                </div>
            </div>





        </div>
    )
}