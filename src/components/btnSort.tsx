
import { ChevronDown } from "lucide-react"

type Props = {
    sections:string;
}

export default function BtnSort({ sections }:Props) {

    return(
    <button className='flex items-center px-3 py-1 rounded-2xl bg-black/8 gap-2 font-semibold text-[13px] text-black/83 cursor-pointer hover:bg-black/10 transition-colors '>
        <p>{sections}</p>
        <ChevronDown size={15} className='text-black font-medium' />
    </button>
    )
}

