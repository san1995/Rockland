import React from 'react'
import { Card, Button } from 'react-bootstrap'

function RockCatalogueComponent(props) {

    const imgsrc = "../../src/assets/rockimg/" + props.name + ".jpg"

  return (
    <div style={{paddingTop:'10px'}}>
      <Card style={{ width: '100%', height:'600px'}}>
      <Card.Img variant="top" src={imgsrc} style={{width:'300px', height:'250px'}}/>
      <Card.Body>
        <Card.Title style={{textTransform:'capitalize'}}>{props.name}</Card.Title>
        <Card.Text>
          Type: {props.type}<br/>
          Colour: {props.colour}<br/>
          Hardness: {props.hardness} / 10<br/>
          Description: {props.description}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default RockCatalogueComponent
