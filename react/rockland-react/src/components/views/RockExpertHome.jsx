import React from 'react'
import UserNavbar from '../navbars/UserNavbar'
import { Container, Row, Col} from 'react-bootstrap'
import YouTube from 'react-youtube'

function RockExpertHome() {      

  return (
    <div>

        <UserNavbar/>

        <Container fluid style={{paddingTop:"130px"}}>
            <div>
                <h2>Welcome Rock Experts !</h2>
                <h6>Lets take a look what the rock community been doing </h6>
            </div>
        </Container>

        <Container fluid>
            <Row className='text-center'>
                <Col>
                    <YouTube videoId='aJDTtAE4dms'/>
                </Col>
                <Col>
                    <YouTube videoId='24R5UO1Xhfw'/>
                </Col>
            </Row>
        </Container>
      
    </div>
  )
}


export default RockExpertHome
