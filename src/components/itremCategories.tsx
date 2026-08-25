import Image from 'next/image'


export default function ItemCategories() {

    return(
    <div className='group flex items-center flex-1 bg-zinc-950/3 hover:bg-zinc-950/8 transition-all cursor-pointer rounded gap-3 p-2'>
        <div className='flex items-center justify-center w-12 h-12 bg-zinc-100 group-hover:bg-zinc-500 rounded relative overflow-hidden border-none '>
            <Image
            src='/itemHeadphone.jpg'
            fill
            className='object-cover group-hover:brightness-95 transition-all '
            alt='Pictrue Headphone'
            />
        </div>

        <div className='flex flex-col '>
            <p className=' font-bold text-zinc-950/90 '>Headphon</p>
            <p className='text-[12px] font-semibold text-black/70'>240 Item Avaliable</p>
        </div>
    </div>
    )
}