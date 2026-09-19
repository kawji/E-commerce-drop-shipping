'use client'
import { useTranslations } from "use-intl"

type Props = {
    namepages:string;
    keytext:string;
}
export default function BtnNormal({namepages="HomePage" ,keytext}:Props) {
    const t = useTranslations(namepages)

    return(
        <button className='cursor-pointer hover:text-shadow-neutral-950 hover:text-black/70 transition-all duration-300 '>{t(keytext)}</button>
    )
}