import HeaderLandingPage from "../components/HeaderLandingPage"
import HomeComponents from "../components/HomeComponents"
import tick from "../assets/tick.png";
import features1 from "../assets/tempsnip.png";
import features2 from "../assets/tempsnip2.png";


const LandingPage = () => {
  return (
    <div>
        {/* Header (eg. NavBar, Banner) */}
        <HeaderLandingPage/>
        
        {/* Body Content */}
        
         

          

          <img src={features1} alt="feature1" />
          <img src={features2} alt="feature2" />
     
    </div>
  )
}

export default LandingPage
