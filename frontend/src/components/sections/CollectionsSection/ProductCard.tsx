import type { ProductType } from "../../../types/ProductType"
import Button from "../../common/Button"
import { getTeamVariant } from "@/utils/teamStyles"

type ProductCardProps = {
  product: ProductType
  team: string
}

const ProductCard = ({ product, team }: ProductCardProps) => {
  const buttonVariant = getTeamVariant(team);

  return (
    <div className="w-40">
      <div>
        <img
          src={product.imgSrc}
          alt={product.name}
          className=" bg-white rounded-2xl w-full h-full"
        />
      </div>

      <div>
        <h5 className="h-18 overflow-hidden">
          {product.name}
        </h5>


        <div className="flex items-center justify-between">
          <p>Price: ${product.price}</p>
          <Button variant={buttonVariant} />
        </div>
      </div>

    </div>
  )
}

export default ProductCard
