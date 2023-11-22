'use client'
import React, { useEffect, useState } from 'react'
import CustomCarousel from '../ui/CustomCarousel'
import { Gets } from '../../lib/api'

const HeroSection = () => {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    ;(async () => {
      const params = { api: 'banners' }
      const res = await Promise.resolve(Gets(params))
      setBanners((res.data || []).map((item) => ({ ...item, img: item.image })))
    })()
  }, [])

  return (
    <section className="min-h-[30vh] lg:min-h-[65vh]">
      <CustomCarousel
        view={false}
        opacity={true}
        arrow={true}
        autoPlay={true}
        height={'h-[30vh] lg:h-[65vh]'}
        data={banners || []}
      />
    </section>
  )
}

export default HeroSection
