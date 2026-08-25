import Image from "next/image";
import Feedpage from "@/layout/feedpage";








export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-100 font-sans dark:bg-[#F8F9FA] ">
      <Feedpage />
    </div>
  );
}




