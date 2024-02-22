import React, { useEffect } from 'react'
import UserNavbar from '../navbars/UserNavbar'
import { Container, Row, Col} from 'react-bootstrap'
import YouTube from 'react-youtube'

function RockBeginnerHome() {  

  return (
    <div>

        <UserNavbar/>

        <Container fluid style={{paddingTop:"130px"}}>
            <div>
                <h2>Welcome Rock Beginner !</h2>
                <h6>Get started on your journey to learning about Rocks</h6>
            </div>
        </Container>

        <Container fluid>
            <Row className='text-center'>
                <Col>
                    <YouTube videoId='7Bxw4kkeHJ8'/>
                </Col>
                <Col>
                    <YouTube videoId='cyBLmW5k06c'/>
                </Col>
            </Row>
        </Container>

        <Container fluid style={{paddingTop:"50px"}}>
            <div>
                <h2>Rock Activities to try</h2>
                <h6>Get started on your rock exploration activites</h6>
            </div>
        </Container>

        <Container fluid>
            <Row className='text-center'>
                <Col>
                    <YouTube videoId='pUXLwgkeVws'/>
                </Col>
                <Col>
                    <YouTube videoId='ek8UFgieHXI'/>
                </Col>
            </Row>
        </Container>
      
    </div>
  )
}


export default RockBeginnerHome
