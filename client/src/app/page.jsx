import FilterSection from '@/components/home/FilterSection'
import HeroSection from '@/components/home/HeroSection'
import NewCarSection from '@/components/home/NewCarSection'
import UsedCarSection from '@/components/home/UsedCarSection'

const page = () => {
  return (
    <main>
      <HeroSection />
      <FilterSection />
      <UsedCarSection />
      <NewCarSection />
    </main>
  )
}

export default page
