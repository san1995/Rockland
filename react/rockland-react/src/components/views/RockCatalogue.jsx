import React, { useEffect, useRef, useState } from 'react'
import UserNavbar from '../navbars/UserNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import RockCatalogueComponent from '../RockCatalogueComponent'
import axios from 'axios';

function RockCatalogue() {

    const [rocks, setRocks] = useState([]);
    
    const searchRef = useRef("");

    const tokenStr = JSON.parse(localStorage.getItem('token'));

    console.log(tokenStr);

    useEffect(() => {
        axios.get("https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/rocks/", {headers:{"Authorization": `Token ${tokenStr}`}})
        .then(response => {
            console.log(response);
            setRocks(response.data);
        });
    }, []);

    const searchRockByName = (event) => {
        event.preventDefault();

        const rockName = searchRef.current.value;

        if (rockName == ""){
            axios.get("https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/rocks/", {headers:{"Authorization": `Token ${tokenStr}`}})
                .then(response => {
                    console.log(response);
                    setRocks(response.data);
            });
        }
        else {
            axios.get(`https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/rocks/${rockName}`, {headers:{"Authorization": `Token ${tokenStr}`}})
            .then(response => {
                console.log(response);
                setRocks([]);
                setRocks(oldArray => [...oldArray, response.data]);
            });
        }
    };



  return (
    <div>

        <UserNavbar/>

        <Container fluid style={{paddingTop:'130px'}}>
            <h2>Rock Catalogue</h2>

            <div>
                <Form onSubmit={searchRockByName}>
                    <Form.Group as={Row} className="mb-3" controlId="formSearchRock">
                        <Col sm="8"></Col>
                        <Col sm="3">
                            <Form.Control type="text" placeholder="Search Rock Name..." ref={searchRef}></Form.Control>
                        </Col>
                        <Col sm="1">
                            <Button style={{backgroundColor:'lightgray', color:'black', border:'none', height:'40px'}} type='submit'>Search</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>

            <Row>
                
                {rocks.map(rock => (
                    <Col md={3}><RockCatalogueComponent name={rock.rock_name} type={rock.type} colour={rock.colour} hardness={rock.hardness} description={rock.description}/></Col>
                ))}
                
            </Row>

        </Container>
      
    </div>
  )
}

export default RockCatalogue
