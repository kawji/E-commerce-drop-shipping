
import { ChevronDown } from "lucide-react"
import { SlidersHorizontal } from 'lucide-react';
import clsx from "clsx";

type Props = {
    sections:string;
    iconFillter?:boolean;
    classStyle?:string
}

export default function BtnSort({ sections ,iconFillter ,classStyle}:Props) {

    return(
    <button className={clsx('flex items-center  shrink-0  px-3 py-1 rounded-2xl bg-black/8 gap-2 font-semibold text-[13px] text-black/83 cursor-pointer hover:bg-black/10 transition-colors '
        ,classStyle
    )}>
        <p>{sections}</p>
        {iconFillter? (<SlidersHorizontal size={15} className='text-black font-medium' />):(<ChevronDown size={15} className='text-black font-medium' />)}
      
    </button>
    )
}

