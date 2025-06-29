import React from 'react'
import OurStory from './OurStort'
import TeamSection from './TeamSection'
import StatsGrid from './cart'
import FeaturesSection from '../Home/SecureProduct/SecureProduct'
// import bag from "../../../assets/iconsimage/shop.png";
// import money from "../../../assets/iconsimage/money.png";
// import dollar from "../../../assets/iconsimage/dollar.jpg";
// import shopping from "../../../assets/iconsimage/shopping.png";
// import CategoryGrid from '../Home/Category/BrowserCategory';

const About = () => {

  return (
    <>

      <div className="w-full max-w-[1170px] -sm py-3 mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <OurStory />
       {/* Other sections */}
      <StatsGrid />
      <TeamSection />
      <FeaturesSection />
            </div>
            </div>
    </>
  )
}

export default About
