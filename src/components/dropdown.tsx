
import { ChevronDown } from "lucide-react"

interface Props {
    section:string;
    sections:string[];
}

export default function Dropdown({section,sections}:Props) {

    return(
    <div className='flex fkex-col gap-2'>
        <div className="flex gap-2">
            <p>{section}</p>
            <ChevronDown />
        </div>

    </div>
    )
}