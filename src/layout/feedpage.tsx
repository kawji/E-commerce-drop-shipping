import { Phone,ChevronDown  } from 'lucide-react';


export default function Feedpage() {

    return(
        <div className="flex flex-col w-full ">
            <nav className="flex item-center justify-center w-full bg-[#0f3612] ">
                <div className='flex items-center justify-between w-full max-w-380 py-2 text-white/83 text-[13px] '>
                    <div className='flex gap-2 items-center '>
                        <Phone size={15} />
                        <p>+024 862 8685</p>
                    </div>
                    <div className='flex gap-2 items-center '>
                        <p>Get 50% Off on Selected Items   |   Shop Now</p>      
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex gap-2'>
                            <p>Eng</p>
                            <ChevronDown />
                        </div>
                        <div className='flex gap-2'>
                            <p>Location</p>
                            <ChevronDown />
                        </div>
                    </div>



                </div>


            </nav>

        </div>
    )
}