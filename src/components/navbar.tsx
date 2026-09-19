'use client'
import { Phone,ChevronDown ,SearchIcon ,ShoppingCart  } from "lucide-react"
import Dropdown from "./dropdown"
import BtnNormal from "./btnNormal"
import BurgerIcon from "@/icons/burger"
import AccountIcon from "@/icons/account"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState ,useRef ,useEffect } from "react"
import clsx from "clsx"

type databaseItemsType = [string,string,number][]

export default function Navbar() {
    const router = useRouter();
    const t = useTranslations('HomePage');
    const [isOpenLang,setIsOpenLang] = useState(false);
    const refLang = useRef<HTMLDivElement>(null);

    const databaseItems:databaseItemsType = [
        ['/itemHeadphone.jpg',"Headphone",240],
        ['/itemHeadphone.jpg',"Computer",850],
        ['/itemHeadphone.jpg',"Computer",230],
        ['/itemHeadphone.jpg',"Computer",190],
        ['/itemHeadphone.jpg',"phone",150],
        ['/itemHeadphone.jpg',"Mouse",90]
    ]
    const handleLocaleChange = (nextLocale: 'en' | 'th') => {
        // บันทึกภาษาลง Cookie ให้มีอายุ 1 ปี
        document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
        router.refresh()
    };

    const handleClickLang = (nextLocale: 'en' | 'th') => {
        handleLocaleChange(nextLocale);
        setIsOpenLang(false);
    }

    useEffect(() => {
        const handleCloseLang = (e: MouseEvent) => {
            if(refLang.current && !refLang.current.contains(e.target as Node) ) {
                setIsOpenLang(false);
            }
        }
        document.addEventListener('mousedown',handleCloseLang)
        return () => {
            document.removeEventListener('mousedown' ,handleCloseLang)
        }
    },[])
    
    

    return(
        <>
            <nav className="z-11 flex item-center justify-center w-full bg-[#0f3612] ">
                <div className='hidden lg:flex items-center justify-between w-full max-w-380 xl:mx-18 lg:mx-13 mx-10 py-2 text-white/83 text-[12px] lg:text-[13px] '>
                    <div className='flex gap-2 items-center '>
                        <Phone size={15} />
                        <p>+024 862 8685</p>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <p>{t('navigation.top-nav')}</p>      
                    </div>
                    <div className='flex items-center  gap-3'>
                        <div ref={refLang} className='flex flex-col items-center gap-2 cursor-pointer   '>
                            <div onClick={() => setIsOpenLang(true)} className="flex items-center justify-center gap-1">
                                <p>Eng</p>
                                <ChevronDown  size={15} />
                            </div>
                            <div className={clsx(" flex flex-col items-center bg-[#0f3612] absolute transition-all duration-100  "
                                ,isOpenLang? 'opacity-100 scale-100 translate-y-7 pointer-events-auto ':'opacity-0 scale-0 translate-y-0 pointer-events-none ' 
                                )}>
                                <button  
                                onClick={() => handleClickLang('en')} 
                                className=" flex items-center min-w-25 px-2 py-1 font-medium cursor-pointer text-[13px] hover:bg-[#134d18] transition-colors ">Eng</button>
                                <button  onClick={() => handleClickLang('th')} className=" flex items-center min-w-25 px-2 py-1 font-medium cursor-pointer text-[13px] hover:bg-[#134d18] transition-colors">ไทย</button>
                            </div>
                        </div>
                        <button className='flex items-center gap-1'>
                            <p>Location</p>
                            <ChevronDown size={15} />
                        </button>
                    </div>
                </div>
            </nav>
            <nav className='w-full flex items-center justify-center bg-zinc-50 z-10 top-0 sticky border-b border-b-black/8 '>
                <div className='max-w-380 w-full flex items-center py-4 font-medium text-black/80 xl:mx-18 lg:mx-13 mx-10 lg:text-sm xl:text-base transition-all '>
                    <BurgerIcon className='flex lg:hidden w-5 h-5 mr-5 cursor-pointer hover:text-black/75 ' />
                    <p className='text-2xl text-[#0f3612] font-bold lg:mr-8 xl:mr-15 2xl:mr-25'>Shopcart</p>
                    <div className='hidden lg:flex shrink-0 items-center gap-5 2xl:gap-9 xl:gap-5  '>
                        <Dropdown namesec={t("navigation.nav-sec1")} section={t("navigation.dropdown-sec1")} itemsCategories={databaseItems} />
                        <BtnNormal namepages={"HomePage"} keytext={"navigation.nav-sec2"} />
                        <BtnNormal namepages={"HomePage"} keytext={"navigation.nav-sec3"} />
                        <BtnNormal namepages={"HomePage"} keytext={"navigation.nav-sec4"} />

                    </div>

                    <div className='flex items-center justify-end flex-1 gap-3 sm:gap-5 2xl:gap-9 xl:gap-5 text-black/80 lg:text-sm xl:text-base '>
                        <div className='relative  flex items-center justify-center w-full ml-5 lg:ml-10 xl:ml-15  max-w-90'>
                            <input 
                            type="text"
                            placeholder='Search Product' 
                            className=' flex-1 outline-none text-sm bg-black/4 text-zinc-950/70 hidden sm:flex items-center px-5 py-2 rounded-2xl transition-all duration-300 ' 
                            
                            />
                            <SearchIcon className='absolute top-1/2 -translate-y-1/2 right-0 lg:right-2 text-black/90 sm:text-[#7F8487] '  />
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
        </>
    )
}