import React, { useEffect } from 'react'
import {Card} from 'react-bootstrap'
import { BsBook } from "react-icons/bs";
import { MdTravelExplore } from "react-icons/md";
import {Link} from 'react-router-dom';



function ForumTopicsComponent(props) {
    
  return (
    <div style={{paddingBottom:"25px"}}>

        <Card>
            <Card.Body key={props.fid}>
                <Link style={{textDecoration:"none", color:"black"}} to={`/forumThreads/${props.fid}`}>
                {props.fid == 1 ? <BsBook size={30}/> : <MdTravelExplore size={30}/>}
                &nbsp;
                {props.topic_name}
                </Link>
            </Card.Body>
        </Card>
      
    </div>
  )
}

export default ForumTopicsComponent
