import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios';

function FourmCommentsComponent(props) {

    const [comment_userLevel, setCommentUserLevel] = useState("");

    const user_level = {"1" : "admin", "2": "business", "3": "Rock Beginner", "4":"Rock Enthusiast", "5":"Rock Expert"};

    // Get user level
    axios.get(`https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/user_profile/${props.comment_user}`)
                .then(response => {
                    console.log(response);
                    setCommentUserLevel(response.data["usertype"]);
                })

  return (
    <div>
      <Card style={{}}>
        <Card.Body key={props.key}>
            <Card.Text style={{fontSize:'12px'}}>{props.comment_user} - {user_level[comment_userLevel]}</Card.Text>

            <Card.Text>{props.comments}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default FourmCommentsComponent
