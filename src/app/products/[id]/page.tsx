import { notFound } from 'next/navigation'
import ProductPage from '@/layout/productpage'
import { getProductByIdOrSlug } from '@/lib/actions/products'

type ProductDetailPageProps = {
    params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params
    // Server Action — resolves either the uuid id or the slug.
    const product = await getProductByIdOrSlug(id)

    if (!product) {
        notFound()
    }

    return (
        <div className="flex flex-col flex-1 items-center bg-zinc-100 font-sans dark:bg-[#F8F9FA]">
            <ProductPage product={product} />
        </div>
    )
}