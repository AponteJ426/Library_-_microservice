import HideAppBar from '../appbar/HideAppBar'
import Footer from './footer'
import HeroSection from './HeroSection'
import HomePage from './homePage'
import { Information } from './Information'
import LibraryInfo from './LibraryInfo'
import LibraryIntro from './LibraryIntro'

function Home() {

    return (
        <>
            <HideAppBar />
            <HeroSection />
            <LibraryIntro />
            <LibraryInfo />
            <Information />
            <HomePage />
            <Footer />
        </>
    )
}

export default Home
