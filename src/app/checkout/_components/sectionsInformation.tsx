


type Props = {
    section:string;
    data:string;
}


export default function SectonInformation({section,data}:Props) {

    return(
    <div className="flex flex-row items-center ">
        <div className="flex items-center justify-start shrink-0 w-26 text-sm font-bold text-start text-wrap ">{section}:</div>
        <div className=" flex items-center justify-start text-sm font-medium text-zinc-950/66 w-full text-nowrap ">{data}</div>
    </div>
        
    )
}