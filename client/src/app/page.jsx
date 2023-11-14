import FilterSection from '../components/home/FilterSection'
import HeroSection from '../components/home/HeroSection'
import NewCarSection from '../components/home/NewCarSection'
import UsedCarSection from '../components/home/UsedCarSection'
import BrandListSection from '../components/home/BrandListSection'
import ReconditionCar from '../components/home/ReconditionCar'
import SellerAds from '../components/home/SellerAds'
import NavbarMenu from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const page = () => {
  return (
    <section className="cscroll relative z-10 flex min-h-screen flex-col overflow-auto">
      <NavbarMenu />
      <main className="mt-14 flex-grow">
        <HeroSection />
        <FilterSection />
        <BrandListSection />
        <NewCarSection />
        <UsedCarSection />
        <ReconditionCar />
        <SellerAds />
      </main>
      <Footer />
    </section>
  )
}

export default page
