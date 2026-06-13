import type { DriverCollectionType } from '../../../types/DriverCollectionType'
import DriverCard from './DriverCard'
import ProductCarousel from './ProductCarousel'


const driverCollections: DriverCollectionType[] = [
  {
    driver: {
      imgSrc: "/lewisHamilton.jpg",
      name: "Lewis Hamilton",
      desc: "7th world championship",
      team: "Scuderia Ferrari",
    },
    products: [
      {
        imgSrc: "/lewisItem1.jpg",
        name: " Silverstone Crew 2025 Zip Up Hoodie",
        price: 120,
      },
      {
        imgSrc: "/lewisItem2.jpg",
        name: "Scuderia Ferrari 2025 Team Lewis Hamilton Cap - White",
        price: 41,
      },
      {
        imgSrc: "/lewisItem3.jpg",
        name: "Scuderia Ferrari SF-25 2025 Official Poster",
        price: 79,
      },
      {
        imgSrc: "/lewisItem4.jpg",
        name: "Scuderia Ferrari Puma Rain Jacket - Black",
        price: 95,
      },
      {
        imgSrc: "/lewisItem5.jpg",
        name: "Scuderia Ferrari Race Premium Jacket - Black",
        price: 80,
      },
      // {
      //   imgSrc: "/lewisItem6.jpg",
      //   name: "Scuderia Ferrari 2026 Team Shirt",
      //   price: 75,
      // },
    ],
  },
]

const DriverCollectionShowcase = () => {
  return (
    <div className='mt-10'>
      {driverCollections.map(({ driver, products }) => (
        <div key={driver.name} className="flex items-center">
          <DriverCard driver={driver} />
          <ProductCarousel products={products} />
        </div>
      ))}
    </div>
  )
}

export default DriverCollectionShowcase
