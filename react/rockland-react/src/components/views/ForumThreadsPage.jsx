import React from 'react'
import { Container, Row, Col, Card, Button} from 'react-bootstrap'
import ForumThreadsComponent from '../ForumThreadsComponent'
import UserNavbar from '../navbars/UserNavbar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ForumThreadsPage(props) {

    const {fid} = useParams();
    const [threads, setThreads] = useState([]);
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get_thread/${fid}`)
            .then(response => {
                console.log(response);
                setThreads(response.data);
            })
    }, []);

  return (
    <div>
      <UserNavbar/>
      <Container fluid style={{paddingTop: "130px"}}>

        <Row>
            <Col>
                <h2>Forum Threads</h2><br/>
            </Col>
        </Row>


        <div>
            <div>
                <Card style={{}}>
                    <Card.Body>
                        <Button style={{width:"130px", height: "40px", float:"right", border:"none", background:"lightgray", color:"black"}}>
                            <Link style={{textDecoration: "none", color: "black"}} to={`/forumNewThread/${fid}`}>+ New Thread</Link>
                        </Button>
                    </Card.Body>
                </Card>
            </div>

                {threads.map(thread => (
                        <ForumThreadsComponent thread_id={thread.thread_id} title={thread.title} description={thread.description} thread_username={thread.username}/>
                    ))}
 
        </div>
      </Container>
    </div>
  )
}

export default ForumThreadsPage
