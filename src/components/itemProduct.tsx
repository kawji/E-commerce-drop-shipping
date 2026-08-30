

import Image from "next/image"
import Staricon from "@/icons/star"

export default function ItemProduct() {

    return(
        <div className='flex flex-col items-center aspect-1/1.25 gap-3 hover:shadow hover:scale-101 cursor-pointer transition-all duration-300 p-2 rounded '>
            <div className=' relative w-full aspect-1.5/1.25 flex items-center justify-center bg-black/5 rounded-md '>
                <Image 
                src="/pg/headphone1-.png"
                width={180}
                height={180}
                style={{
                    objectFit:'cover'
                }}
                alt="Picture of the headphon"
                />

            </div>
            <div className='flex-1 w-full flex flex-col  '>
                <div className='flex flex-col w-full gap-1'>
                    <div className='flex items-center justify-between text-base  font-bold text-black/88 '>
                        <p className=' leading-none '>Bose BT Earphones</p>
                        <span className='flex text-[11px] '>
                            <p>$</p>
                            <p className='text-base'>283</p>
                            <p>.00</p>
                        </span>
                    </div>
                    <div className='text-[11px] text-black/70 font-semibold '>
                        Table with air purifier, stained venner/black
                    </div>
                    <div className='flex gap-1 '>
                        <Staricon className='text-green-500' />
                        <Staricon className='text-green-500' />
                        <Staricon className='text-green-500' />
                        <Staricon className='text-green-500' />
                        <Staricon className='text-green-500' />
                        <p className='text-[12px] ml-1 text-black/77 '>(121)</p>
                    </div>
                    <div className='w-full flex items-center mt-1'>
                        <button className='px-3.5 py-1.5 border rounded-3xl text-[12px] font-semibold tracking-wide cursor-pointer border-[#0f3612] bg-zince-50 hover:bg-[#0f3612] hover:text-white/93 text-black/90  transition-colors  '>Add to Cart</button>

                    </div>

                </div>

            </div>
        

        </div>
    )
}