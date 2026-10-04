import { notFound } from 'next/navigation'
import ProductPage from '@/layout/productpage'
import { PRODUCTS } from '@/data/productMockData'

type ProductDetailPageProps = {
    params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params
    const product = PRODUCTS.find((item) => item.id === id)

    if (!product) {
        notFound()
    }

    return (
        <div className="flex flex-col flex-1 items-center bg-zinc-100 font-sans dark:bg-[#F8F9FA]">
            <ProductPage product={product} />
        </div>
    )
}