import Feedpage from "@/layout/feedpage";
import { getProducts } from "@/lib/actions/products";

export default async function Home() {
  // Server Action — the feed never fetches data on the client.
  const products = await getProducts();

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-100 font-sans dark:bg-[#F8F9FA] ">
      <Feedpage products={products} />
    </div>
  );
}