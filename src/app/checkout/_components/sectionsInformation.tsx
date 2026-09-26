


type Props = {
    section:string;
    data:string;
}


export default function SectionInformation({section,data}:Props) {

    return(
        <div className="flex flex-row items-center w-full min-w-0">
            <div className="flex items-center justify-start shrink-0 w-18 sm:w-26 text-sm font-bold text-start text-wrap">
                {section}:
            </div>
            {/* truncate กับ flex ใช้ด้วยกันไม่ได้ ไม่งั้น Line-clamp จะไม่ทำงาน */}
            <div 
                className=" text-sm font-medium text-zinc-950/66 truncate flex-1 text-start" 
                title={data}
            >
                {data}
            </div>
        </div>
    )
}


