import { FaqComponents } from '@/components/faq/FaqComponents'
import FooterComponent from '@/components/footer/FooterComponents'
import HeaderComponent from '@/components/header/HeaderComponents'
import React from 'react'

export default function page() {
  return (
    <>
     <HeaderComponent />
     <FaqComponents />
     <FooterComponent />
    </>
  )
}
