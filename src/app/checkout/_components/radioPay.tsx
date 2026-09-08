

type Props = {
    currentPay:string;
    setCurrentPay: (pay:string) => void;
    value:string;
    section:string;
}


export default function RadioPay({currentPay ,setCurrentPay ,value ,section }:Props) {

    return(
    <label className="flex items-center gap-2 cursor-pointer" >
        <input 
        type="radio" 
        value={value}
        checked={currentPay===value}
        onChange={(e) => setCurrentPay(e.target.value)}
        className="w-4 h-4 text-green-700 border-gray-300 focus:ring-green-500 accent-green-600  "
        />
        <span className=" text-sm font-medium ">{section}</span>
    </label>
    )
}







