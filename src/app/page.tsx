import Image from "next/image";
import Feedpage from "@/layout/feedpage";








export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <Feedpage />
    </div>
  );
}




