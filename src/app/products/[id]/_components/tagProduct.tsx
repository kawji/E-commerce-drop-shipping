
import { type LucideIcon } from 'lucide-react';

import clsx from 'clsx';

type Props = {
    icon:LucideIcon;
    section:string;
    space?:"gap-0" | "gap-1" | "gap-2" | "gap-3" | "gap-4" | "gap-5"
    word1?:string;
    word2?:string;
    word3?:string;
    underword1?:string;
    underword2?:string;
    underword3?:string;
}


export default function TagProduct({
    icon:Icon ,
    section,
    space='gap-0',
    word1='',
    word2='',
    word3='',
    underword1='',
    underword2='',
    underword3='',

}:Props) {

    return(
    <div className="flex items-start justify-start px-6 py-4 gap-2 border-b border-b-black/6 ">
        <Icon className="text-yellow-600 " size={22}  />
        <div className="flex flex-col ">
            <p className=" text-zinc-950/90 font-semibold text-sm leading-relaxed">{section}</p>
            <div className={clsx(" text-[12px] text-zinc-950/67 font-medium flex items-center  ",space)}> 
                <p>{word1}</p>  
                <p className='underline cursor-pointer hover:text-zinc-950/57'>{underword1}</p>  
                <p>{word2}</p>  
                <p className='underline cursor-pointer hover:text-zinc-950/57'>{underword2}</p>  
                <p>{word3}</p>  
                <p className='underline cursor-pointer hover:text-zinc-950/57'>{underword3}</p>  
            </div>
        </div>
    </div>
    )
}
