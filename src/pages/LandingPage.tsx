import React from 'react'
import HeroSection from '../components/home/HeroSection'
import SpotifyLogoSection from '../components/SpotifyLogoSection/SpotifyLogoSection'
import FeatureSection from '../components/features/FeatureSection'
import Footer from '../components/footer/Footer'

const LandingPage = () => {
    return (
        <div>
        <HeroSection />
        <SpotifyLogoSection/>
        <FeatureSection />
        <Footer/>
        </div>
    )
}

export default LandingPage;