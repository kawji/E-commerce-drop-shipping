
import { type LucideIcon } from 'lucide-react';
import VisaIcon from "@/icons/visa"
import clsx from "clsx"
import { type IconName ,iconList } from '@/icons/iconsList';


type Props = {
    icon:IconName;
    iconLucid?:LucideIcon;
    title:string;
    currentSelect:string;
    onCurrentSelect: (title:string) => void;
}

export default function ItemPay({ icon ,iconLucid:IconLucid ,title ,currentSelect ,onCurrentSelect }:Props) {
    const SelectIcon = iconList[icon]
    return(
        <div className={clsx(" flex items-center justify-centerpy-2 h-7.5 w-15 px-2.5 py-2.5 bg-black/4 rounded-sm border cursor-pointer hover:bg-black/8 "
        ,title === currentSelect ? "border-green-700/75":"border-green-700/0 "
        )}
        onClick={() => onCurrentSelect(title)}
        >
            
            {IconLucid? <IconLucid />:<SelectIcon className="text-blue-800 w-auto   " />}
            
        </div>
    )
}