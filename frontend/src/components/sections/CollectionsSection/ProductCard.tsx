import type { ProductType } from "../../../types/ProductType"
import Button from "../../common/Button"

type ProductCardProps = {
  product: ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-40">
      <div>
        <img
          src={product.imgSrc}
          alt={product.name}
          className=" bg-white rounded-2xl"
        />
      </div>

      <div>
        <h5 className="h-18 overflow-hidden">
          {product.name}
        </h5>


        <div className="flex items-center justify-between">
          <p>Price: ${product.price}</p>
          <Button />
        </div>
      </div>

    </div>
  )
}

export default ProductCard
