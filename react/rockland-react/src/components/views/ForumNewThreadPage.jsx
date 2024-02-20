import React, { useRef } from 'react'
import UserNavbar from '../navbars/UserNavbar'
import { Container, Form, Button} from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForumNewThreadPage(props) {

    const navigate = useNavigate();

    // current login user
    const username = JSON.parse(localStorage.getItem('username'));
    // from url Parameter
    const {fid} = useParams();

    // ref value from text boxes
    const titleRef = useRef("");
    const descriptionRef = useRef("");

    const newThread = (event) => {
        event.preventDefault();
        // Get value from input
        const thread = {title: titleRef.current.value, description: descriptionRef.current.value, username: username, fid: fid}

        // Reset value
        titleRef.current.value = ""
        descriptionRef.current.value = ""

        console.log(thread);

        axios.post('http://127.0.0.1:8000/api/post_thread', thread)
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.status === 201){
                    navigate(`/forumThreads/${fid}`);
                }

            });
    };

  return (
    <div>
        <UserNavbar/>
        <Container fluid style={{paddingTop:"130px"}}>
            <h2>New Thread</h2>
            <Form onSubmit={newThread}>
                <Form.Group className='mb-3' controlId='newThreadForm.titleInput'>
                    <Form.Label>Thread Title</Form.Label>
                    <Form.Control type="text" ref={titleRef}/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='newThreadForm.descriptionInput'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={10} ref={descriptionRef}/>
                </Form.Group>

                <Button type="submit" style={{background:"lightgray", border:"none", color:"black"}}>Submit</Button>
            </Form>
        </Container>
    </div>
  )
}

export default ForumNewThreadPage
