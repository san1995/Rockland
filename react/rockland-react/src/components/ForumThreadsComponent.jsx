import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ForumThreadsComponent(props) {
  return (
    <div>
      <Link to={`/forumComments/${props.thread_id}`} style={{textDecoration: "none", color: "black"}}>
        <Card key={props.thread_id}>
          <Card.Body>
              <Card.Title>{props.title}</Card.Title>
              <Card.Subtitle>By: {props.thread_username}</Card.Subtitle>

              <Card.Text>{props.description}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  )
}

export default ForumThreadsComponent
