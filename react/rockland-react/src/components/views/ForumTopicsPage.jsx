import React from 'react';
import ForumTopicsComponent from '../ForumTopicsComponent';
import UserNavbar from '../navbars/UserNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ForumTopicsPage() {

    const [topics, setTopics] = useState([]);


    useEffect(() => {
        // Get Topics from Api
        axios.get(`http://127.0.0.1:8000/api/topics/`)
            .then(res => {
                console.log(res);

                setTopics(res.data);
            })
    }, []);


  return (
    <div>
      <UserNavbar/>
      <Container fluid style={{paddingTop:"130px"}}>
        <Row>
            <Col><h2>Forums Topics</h2></Col>
        </Row>
        <br/>
        <Row style={{paddingLeft:"50px"}}>
            <Col md={8}>
                {topics.map(topic => (
                    <ForumTopicsComponent key={topic.fid} fid={topic.fid} topic_name={topic.topic_name} />
                ))}
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForumTopicsPage
