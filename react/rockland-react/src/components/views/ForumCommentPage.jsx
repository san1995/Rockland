import React from 'react'
import UserNavbar from '../navbars/UserNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import FourmCommentsComponent from '../FourmCommentsComponent'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef} from 'react'
import axios from 'axios'

function ForumCommentPage(props) {

    // current login user
    const username = JSON.parse(localStorage.getItem('username'));

    const {threadid} = useParams();
    const [thread, setThread] = useState({thread_id: "", title: "", description: "", username:""});
    const [comments, setComments] = useState([]);
    const [thread_user, setThread_User] = useState("");
    const [thread_userRole, setThreadUserRole] = useState("");
    const commentRef = useRef("");

    const user_level = {"1" : "admin", "2": "business", "3": "Rock Beginner", "4":"Rock Enthusiast", "5":"Rock Expert"};

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/get_threadByTId/${threadid}`)
            .then(response => {
                console.log(response);
                setThread(response.data)
                setThread_User(response.data['username']);
                return axios.get(`http://127.0.0.1:8000/api/user_profile/${thread_user}`)
                .then(response => {
                    console.log(response);
                    setThreadUserRole(response.data["usertype"]);
                })
            });

        axios.get(`http://127.0.0.1:8000/api/get_comments/${threadid}`)
            .then(res => {
                console.log("Comments");
                console.log(res);
                setComments(res.data);
            })
    },[thread_user]);


    const addComment = (event) => {
        event.preventDefault();
        // Get value from comment box
        const newComment = {thread_id: threadid, comments: commentRef.current.value, username: username}

        // Reset value
        commentRef.current.value = "";

        axios.post("http://127.0.0.1:8000/api/post_comments", newComment)
            .then(res => {
                console.log(res);
                // To update comment displayed instantly without clicking refresh of page
                return axios.get(`http://127.0.0.1:8000/api/get_comments/${threadid}`)
                .then(res => {
                    console.log("Comments");
                    console.log(res);
                    setComments(res.data);
                })
            });
    }

  return (
    <div>
      <UserNavbar/>

      <Container fluid style={{paddingTop:'130px'}}>
        
        <Row>
            <h4>{thread.title}</h4>
        </Row>
        <Row>
            <p>{thread.description}</p>
        </Row>
        <Row>
            <p style={{fontSize:'13px'}}>By: {thread.username} - {user_level[thread_userRole]}</p>
        </Row>

        <hr></hr>

      </Container>

      <Container fluid>
        <h5>Comments</h5>

        {comments.map(comment => (
            <FourmCommentsComponent key={comment.comment_id} comment_id={comment.comment_id} comments={comment.comments} comment_user={comment.username}/>
        ))}
      </Container>

      <Container fluid style={{paddingTop:'15px'}}>
        <Form onSubmit={addComment}>
            <Form.Control as="textarea" rows={5} placeholder='Add your comments here....' ref={commentRef}/><br/>
            <Button style={{width:'150px', float:'right'}} type='submit'>Add Comment</Button>
        </Form>
      </Container>
    </div>
  )
}

export default ForumCommentPage
