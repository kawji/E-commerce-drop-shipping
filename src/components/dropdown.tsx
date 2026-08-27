
import { ChevronDown } from "lucide-react"
import clsx from "clsx";
import ItemCategories from "./itremCategories";
import { useRef ,useEffect ,useState } from "react";
import {useTranslations} from 'next-intl';


type Props = {
    namesec:string;
    section:string;
    itemsCategories:[string,string,number][];
}

export default function Dropdown({namesec,section,itemsCategories}:Props) {
    const [categories,setCategories] = useState(false);
    const categoriesRef = useRef<HTMLDivElement>(null);
  

    useEffect(() => {
        function handleShowCategories(event:MouseEvent) {
            if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
                setCategories(false)
            }
        }
        document.addEventListener("mousedown",handleShowCategories);
        return () => {
            document.removeEventListener("mousedown",handleShowCategories);
        } 
    },[])


    return(
        <div ref={categoriesRef} className='flex relative  h-4  '>
            <div className="flex items-center gap-2 font-medium cursor-pointer text-black/80 hover:text-black/70 transition-all duration-300"
            onClick={()=> setCategories(true)}
            >
                <p>{namesec}</p>
                <ChevronDown size={20} className='text-black/72  ' />
            </div>

            <div className={clsx('absolute z-2 top-8  w-169 flex flex-col items-start  border border-black/8 py-2 px-5 rounded-md transition-all duration-150 '
                ,categories? 'opacity-100 scale-100 pointer-events-auto':'opacity-0 scale-95 pointer-events-none'
            )}
            >
                <div className='flex items-center py-4 w-full text-xl font-bold text-zinc-950/88 border-b border-b-black/10 mb-6 '>
                    {section}
                </div>
                
                <div className='grid grid-cols-2 gap-x-6 gap-y-5 w-full '>
                    {itemsCategories.map(([src,name,quantity],index) => {
                        return(
                        <ItemCategories src={src} section={name} quantity={quantity} key={index} />
                    )})}

                </div>
            </div>
        </div>
    )
}