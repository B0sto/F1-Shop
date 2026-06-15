import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductType } from '../../../types/ProductType'
import ProductCard from './ProductCard'
import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import "swiper/css";

type ProductCarouselProps = {
  products: ProductType[]
  team: string
}

const ProductCarousel = ({ products, team }: ProductCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const canSlide = products.length > 3;

  return (
    <div className="flex items-start gap-x-4">
      <button
        type="button"
        className="mt-18 flex items-center disabled:opacity-40"
        aria-label="Previous products"
        disabled={!canSlide}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft size={30} />
      </button>

      <Swiper
        className="w-180"
        spaceBetween={20}
        slidesPerView={4}
        loop={canSlide}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.imgSrc}>
            <ProductCard product={product} team={team} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="mt-18 flex items-center disabled:opacity-40"
        aria-label="Next products"
        disabled={!canSlide}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight size={30} />
      </button>
    </div>
  )
}

export default ProductCarousel
