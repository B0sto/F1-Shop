import { useQuery } from '@tanstack/react-query'
import DriverCard from './DriverCard'
import ProductCarousel from './ProductCarousel'
import { getCollections } from '@/services/providers/api/collectionsApi'



const DriverCollectionShowcase = () => {
  const { data: response } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  const driverCollections = response?.data;

  return (
    <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
      {driverCollections?.map(({ driver, products }) => (
        <div
          key={driver.name}
          className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8"
        >
          <DriverCard driver={driver} />
          <ProductCarousel products={products} team={driver.team} />
        </div>
      ))}
    </div>
  )
}

export default DriverCollectionShowcase
