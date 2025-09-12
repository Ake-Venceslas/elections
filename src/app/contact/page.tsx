import HeaderComponent from '@/components/header/HeaderComponents'
import React from 'react'
import ContactComponent from '@/components/contact/ContactComponents'
import FooterComponent from '@/components/footer/FooterComponents'



export default function page() {
  return (
    <>
       <HeaderComponent />
       <ContactComponent />
       <FooterComponent />
    </>
  )
}
