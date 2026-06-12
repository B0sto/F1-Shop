import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductType } from '../../../types/ProductType'
import ProductCard from './ProductCard'

type ProductCarouselProps = {
  products: ProductType[]
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  return (
    <div className="flex">
      <div className="flex h-50 items-center">
        <ChevronLeft size={30}/>
      </div>

      <div className="flex gap-x-5">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      <div className="flex h-50 items-center">
        <ChevronRight size={30}/>
      </div>
    </div>
  )
}

export default ProductCarousel
