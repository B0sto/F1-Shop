import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ProductType } from '../../../types/ProductType'
import ProductCard from './ProductCard'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import "swiper/css";

type ProductCarouselProps = {
  products: ProductType[]
  team: string
}

const ProductCarousel = ({ products, team }: ProductCarouselProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isLocked, setIsLocked] = useState(products.length <= 1);

  const updateLockState = (swiper: SwiperType) => {
    setIsLocked(swiper.isLocked);
  };

  return (
    <div className="flex min-w-0 items-start gap-x-2 sm:gap-x-3 lg:flex-1 lg:gap-x-4">
      <button
        type="button"
        className="mt-32 hidden items-center disabled:cursor-default disabled:opacity-40 sm:flex cursor-pointer"
        aria-label="Previous products"
        disabled={isLocked}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ChevronLeft size={30} />
      </button>

      <Swiper
        className="w-full min-w-0"
        spaceBetween={14}
        slidesPerView={1.8}
        watchOverflow
        breakpoints={{
          480: {
            slidesPerView: 2.4,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 3.4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateLockState(swiper);
        }}
        onResize={updateLockState}
        onBreakpoint={updateLockState}
        onLock={() => setIsLocked(true)}
        onUnlock={() => setIsLocked(false)}
      >
        {products.map((product) => (
          <SwiperSlide key={product.imgSrc}>
            <ProductCard product={product} team={team} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="mt-32 hidden items-center disabled:cursor-default disabled:opacity-40 sm:flex cursor-pointer"
        aria-label="Next products"
        disabled={isLocked}
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ChevronRight size={30} />
      </button>
    </div>
  )
}

export default ProductCarousel
