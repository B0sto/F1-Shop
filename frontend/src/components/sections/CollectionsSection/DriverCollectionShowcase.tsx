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
    <div className='mt-10'>
      {driverCollections?.map(({ driver, products }) => (
        <div key={driver.name} className="flex items-center justify-between mt-10">
          <DriverCard driver={driver} />
          <ProductCarousel products={products} team={driver.team} />
        </div>
      ))}
    </div>
  )
}

export default DriverCollectionShowcase
