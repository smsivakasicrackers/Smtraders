import React from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/ExploreMenu/exploremenu'
import FlashingOfferBox from '../../components/FlashingOfferBox'
import MetaData from './MetaData'
import Crackerdisplay from '../../components/cracker/Crackerdisplay'
import Footer from '../../components/footer/Footer'

// Combo Packs temporarily hidden until the new combo lineup is ready.
// import Combo from '../../components/Combo'
import TestimonialSection from '../../components/TestimonialSection'


const Home = () => {
  return (

    <div>
      <FlashingOfferBox/>
   <MetaData title={`Buy Best Products`}/>
  <Header/>
<Exploremenu/>

<Crackerdisplay/>
{/* <Combo/> temporarily hidden until the new combo lineup is ready */}
<TestimonialSection/>
{/* <About/> */}
<Footer/>
  </div>


  )
}

export default Home