
import { useState } from "react"
import clsx from "clsx";

type Props = {
    limit:number;
}

export default function ButtonCount({limit}:Props) {
    const [countProduct,setCountProduct] = useState(1);

    return(
    <div className="grid grid-cols-3 aspect-3.75/1.25 w-36 bg-black/5 rounded-full ">
        <button className={clsx("flex items-center justify-center w-full h-full text-xl cursor-pointer scale-130 hover:scale-170 transition-all duration-300 "
            ,countProduct === 1 ? "opacity-40":"opacity-100"
        )}
            onClick={() => setCountProduct((prev) => {
                if(prev > 1) {
                    return prev-1
                }
                return prev
            })}
        >-</button>
        <div className="flex items-center justify-center w-full h-full text-base ">{countProduct}</div>
        <button className={clsx("flex items-center justify-center w-full h-full text-xl cursor-pointer scale-130 hover:scale-170 transition-all duration-300 "
            ,countProduct === limit ? "opacity-40":"opacity-100"
        )}
        onClick={() => setCountProduct((prev) => {
            if(prev < limit) {
                return prev + 1
            }
            return prev
        })}

        >+</button>

    </div>
    )
}
