import React from 'react'
import Hero2 from '../components/Hero2'
import Cta from '../components/Cta'
import ContentLayout from '../components/ContentLayout'
import { useState } from 'react'

const Disclaimer = () => {
  const [showButton, setShowButton] = useState(false)
  return (
    <>
      <Hero2
        heading={
          <>
            <span className='text-red'>Disclaimer</span>
          </>
        }
        button = {showButton}
        />
      <ContentLayout />
      <Cta 
        heading={
          <>
            <span className='text-[#ffffff]'>Simplify your financial journey today with TheCEOApp.</span>
          </>
        }
        paragraph={
          <>
            <span className='text-[#ffffff]'>Join thousands of businesses already benefiting from TheCEOApp and experience a new standard in accounting and business management.</span>
          </>
        }
      />
    </>
  )
}

export default Disclaimer