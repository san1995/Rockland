import Header from "../components/Header"
import HeaderLandingPage from "../components/HeaderLandingPage"
import HomeComponents from "../components/HomeComponents"

const Home = () => {
  return (
    <div>
        {/* Header (eg. NavBar, Banner) */}
        <HeaderLandingPage/>
       
        {/* Body Content */}
        <HomeComponents/>
        
    </div>
  )
}

export default Home
