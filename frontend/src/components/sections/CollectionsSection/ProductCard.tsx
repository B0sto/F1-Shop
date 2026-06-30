import type { ProductType } from "../../../types/ProductType"
import Button from "../../common/Button"
import { getTeamVariant, teamClasses } from "@/utils/teamStyles"

type ProductCardProps = {
  product: ProductType
  team: string
}

const ProductCard = ({ product, team }: ProductCardProps) => {
  const teamVariant = getTeamVariant(team);
  const { buttonStyles } = teamClasses[teamVariant];

  return (
    <div className="w-full">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl">
        <img
          src={product.imgSrc}
          alt={product.name}
          loading="lazy"
          className="w-[80%] h-[90%] object-cover rounded-2xl"
        />
      </div>

      <div className="mt-2">
        <h5 className="min-h-14 overflow-hidden text-base leading-tight sm:min-h-16 sm:text-lg">
          {product.name}
        </h5>


        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-base sm:text-lg">Price: ${product.price}</p>
          <Button className={buttonStyles} product={product} />
        </div>
      </div>

    </div>
  )
}

export default ProductCard
