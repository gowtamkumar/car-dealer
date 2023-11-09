import FilterSection from '../components/home/FilterSection'
import HeroSection from '../components/home/HeroSection'
import NewCarSection from '../components/home/NewCarSection'
import UsedCarSection from '../components/home/UsedCarSection'
import BrandListSection from '../components/home/BrandListSection'
import ReconditionCar from '../components/home/ReconditionCar'
import SellerAds from '../components/home/SellerAds'

const page = () => {
  return (
    <main>
      <HeroSection />
      <FilterSection />
      <BrandListSection />
      <NewCarSection />
      <UsedCarSection />
      <ReconditionCar />
      <SellerAds />
    </main>
  )
}

export default page
