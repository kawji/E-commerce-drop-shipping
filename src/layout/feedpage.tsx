import { Phone,ChevronDown  } from 'lucide-react';


export default function Feedpage() {
    
    const sections = ['ไทย','Eng']


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
            <nav className='w-full flex items-center justify-center '>
                <div className='max-w-380 w-full flex gap-5  '>

                    <p className='text-2xl text-[#0f3612] font-bold '>Shopcart</p>
                    <div className='flex  '>
                        <div className="flex gap-10 cursor-pointer text-black/90 hover:text-black/70 transition-all duration-300">
                            <p>Categories</p>
                            <ChevronDown />
                        </div>

                        <div className='z-2 absolute flex flex-col items-center border border-black/8 py-2 rounded-md '>
                            <div className=' flex px-3 py-4 text-lg font-semibold border-b border-b-black/15 '>
                                popular Categories
                            </div>
                            <div className='grid grid-cols-2'>
                                <div className='flex flex-row itmes-center bg-black/4 rounded-xl gap-3 '>
                                    <div className='w-10 h-10 bg-black rounded'>

                                    </div>

                                    <div className='flex flex-col gap-3 '>
                                        <p className='text-lg font-medium '>Headphon</p>
                                        <p className='text-sm text-black/70'>240 Item Avaliable</p>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>
                </div>



            </nav>









        </div>
    )
}