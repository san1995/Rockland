import HeaderLandingPage from "../components/HeaderLandingPage"
import HomeComponents from "../components/HomeComponents"
import tick from "../assets/tick.png";
import features1 from "../assets/tempsnip.png";
import features2 from "../assets/tempsnip2.png";
import IndexNavbar from "../components/navbars/IndexNavbar";
import LandingPageHeader from "../components/headers/LandingPageHeader";

import { Container, Row, Col} from "react-bootstrap";
import { GoArchive } from "react-icons/go";
import { BsAward } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";


function LandingPage(){
  return (
    <div>
        {/* Header (eg. NavBar, Banner) */}
        {/* <HeaderLandingPage/> */}
        <IndexNavbar/>
        {/* <LandingPageHeader/> */}
        <LandingPageHeader/>
        
        {/* Body Content */}
          {/* <img src={features1} alt="feature1" />
          <img src={features2} alt="feature2" /> */}

        <div style={{height:"100vh"}} className="d-flex align-items-center">
          <Container fluid>
            <Row>
              <Col className="text-center">
                <h2>How you can learn?</h2>
                <h5>There is multiple ways you can start learning about rocks on our app</h5>
              </Col>
            </Row>
            
            <br/>

            <Row>
              <Col></Col>
              <Col className="text-center">
                <div><GoArchive size={70}/></div><br/>
                <p>Discover different kind of rocks through our rock catalogue!</p>
              </Col>
              <Col className="text-center">
                <div><BsAward size={70}/></div><br/>
                <p>Test your knowledge about rock & collect badges to show off your knowledge level about rocks!</p>
              </Col>
              <Col className="text-center">
                <div><BsChatLeftText size={70}/></div><br/>
                <p>Discuss with our community your discovery and knowledge about rocks on the Forum!</p>
              </Col>
              <Col></Col>
            </Row>
            <br/>
            <Row>
              <Col className="text-center">
                <h6>Register with us now to start. It's free!</h6>
              </Col>
            </Row>
          </Container>
        </div>
     
    </div>
  )
}

export default LandingPage
