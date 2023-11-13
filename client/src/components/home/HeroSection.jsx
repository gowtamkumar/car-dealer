'use client'
import React from 'react'
import CustomCarousel from '../ui/CustomCarousel'
import { carouselData } from '../../config'

const HeroSection = () => {
  return (
    <section className="min-h-[30vh] lg:min-h-[65vh]">
      <CustomCarousel
        view={false}
        opacity={true}
        arrow={true}
        height={'h-[30vh] lg:h-[65vh]'}
        data={carouselData}
      />
    </section>
  )
}

export default HeroSection
