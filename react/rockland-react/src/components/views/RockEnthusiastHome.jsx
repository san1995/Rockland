import React from 'react'
import UserNavbar from '../navbars/UserNavbar'
import { Container, Row, Col} from 'react-bootstrap'
import YouTube from 'react-youtube'

function RockEnthusiastHome() {      

  return (
    <div>

        <UserNavbar/>

        <Container fluid style={{paddingTop:"130px"}}>
            <div>
                <h2>Welcome Rock Enthusiast !</h2>
                <h6>Continue your journey to learning about Rocks to becoming an expert</h6>
            </div>
        </Container>

        <Container fluid>
            <Row className='text-center'>
                <Col>
                    <YouTube videoId='cjbzAJrC8-Y'/>
                </Col>
                <Col>
                    <YouTube videoId='8a7p1NFn64s'/>
                </Col>
            </Row>
        </Container>

        <Container fluid style={{paddingTop:"50px"}}>
            <div>
                <h2>Rock Exploration</h2>
                <h6>Look at other explorer tips & trick and their exploration activities</h6>
            </div>
        </Container>

        <Container fluid>
            <Row>
                <Col>
                    <YouTube videoId='gm5OhCnSMNU'/>
                </Col>
                <Col>
                    <YouTube videoId='bBB4vvMj3Co'/>
                </Col>
            </Row>
        </Container>
      
    </div>
  )
}


export default RockEnthusiastHome
