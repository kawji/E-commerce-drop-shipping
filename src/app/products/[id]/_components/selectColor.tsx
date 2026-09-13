
import clsx from "clsx"

type Props = {
    colorName:string;
    color600:string;
    color300:string;
    select:boolean;
    onSelect:(colorName:string)=> void;

}

export default function SelectColor({colorName ,color600 ,color300 ,select ,onSelect}:Props) {

    return(
        <button 
        className={clsx(" flex items-center justify-center rounded-full aspect-square w-10 hover:opacity-100 opacity-88 transition-all duration-300 p-0.75 cursor-pointer  "
            ,select ? "border-[1.5px] border-green-900":" border-none"
        )}
        onClick={() => onSelect(colorName)}
        >
            <div className="flex flex-col items-center justify-center rounded-full w-full h-full overflow-hidden ">
                <span className={clsx("flex flex-1 w-full ",color600)}></span>
                <span className={clsx("flex flex-1 w-full ",color300)}></span>
            </div>
        </button>
    )
}

