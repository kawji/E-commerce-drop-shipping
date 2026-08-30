
import { SVGProps } from "react"

export default function BurgerIcon(props:SVGProps<SVGSVGElement>) {


    return(
        <>
            <svg viewBox="0 0 24 24" {...props} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 18H10" stroke="currentColor" stroke-width="2" stroke-linecap="base"/>
            <path d="M4 12L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="base"/>
            <path d="M4 6L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="base"/>
            </svg>
        </>

    )
}