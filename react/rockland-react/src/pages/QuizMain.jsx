import React from 'react';
import UserNavbar from '../components/navbars/UserNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ButtonWithRedirect = ({ label, path, disabled, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("label passed:" + label)
    if (!disabled) {
      if (onClick) {
        onClick(); // Execute custom onClick function if provided
        if (label === "Level 1") {
          navigate("/quiz1");
        } else if (label === "Level 2") {
          navigate("/quiz2");
        } else if (label === "Level 3") {
          navigate("/quiz3");
        } else if (label === "Level 4") {
          navigate("/quiz4");
        } else if (label === "Level 5") {
          navigate("/quiz5");
        } else if (label === "Level 6") {
          navigate("/quiz6");
        }
      } else {
        navigate(path); // Redirect to the specified path only if button is not disabled and no custom onClick function is provided
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{ 
        backgroundColor: disabled ? 'darkgrey' : 'black',
        color: disabled ? 'grey' : 'white',
        
      }}
      //style={{ backgroundColor: disabled ? 'grey' : 'inherit' }}
    >
      {label}
    </button>
  );
};

const QuizMain = () => {
  const messageToUser = "get full marks for quiz to unlock more levels and level up!"
  // Define button disabled states based on user type
  const uname = localStorage.getItem('username')
  const utype = localStorage.getItem('usertype')
  const uname_WithoutQuotes = uname.replace(/"/g, ''); // Remove double quotes 
  console.log("QuizMain get uname and utype")
  console.log(uname + "   " + utype)

  const baseUrl2 = 'http://127.0.0.1:8000/api/';
  const endpoint2 = 'user_profile';
  var input = `${baseUrl2}${endpoint2}/${uname_WithoutQuotes}`
  var urlwithoutdoublequote2 = input.replaceAll("\"", ""); //get rid of excess char

  // Make the get request to http://127.0.0.1:8000/api/user_profile to get data from user_profile table
  axios.get(urlwithoutdoublequote2)
  //axios.get(`${baseUrl}{uname}`, { headers })
  .then(response => {
      // Handle successful response
      console.log("call /api/user_profile data:")
      console.log(response.data);
      //update global vars
      localStorage.setItem('usertype', JSON.stringify(response.data.usertype)) //update usertype
  })
  .catch(error => {
      // Handle error
      console.error('Error:', error);
  });

  const utypeWithoutApostrophe = localStorage.getItem('usertype').replace(/"/g, ''); // Remove double quotes
  console.log("type chk" + utypeWithoutApostrophe)
  let isButtonDisabled1 = true;
  let isButtonDisabled2 = true;
  let isButtonDisabled3 = true;
  let isButtonDisabled4 = true;
  let isButtonDisabled5 = true;
  let isButtonDisabled6 = true;

  if (utypeWithoutApostrophe === "3") { //if user is rock beginner
    isButtonDisabled1 = false;
    isButtonDisabled2 = false;
  } else if (utypeWithoutApostrophe === "4") { //if user is rock enthusiast
    isButtonDisabled1 = false;
    isButtonDisabled2 = false;
    isButtonDisabled3 = false;
    isButtonDisabled4 = false;
  } else if (utypeWithoutApostrophe === "5") { //if user is rock expert
    isButtonDisabled1 = false;
    isButtonDisabled2 = false;
    isButtonDisabled3 = false;
    isButtonDisabled4 = false;
    isButtonDisabled5 = false;
    isButtonDisabled6 = false;
  }

  return (
    <div>
      {/* Header (eg. NavBar, Banner) */}
      <UserNavbar/>
      <Container fluid style={{paddingTop:'130px'}}>
      {/* Render buttons with appropriate disabled states */}
      <Row>
        <Col>
          <h1>Quiz levels</h1>
          <p>{messageToUser}</p>
        </Col>
      </Row>
      <Row>
        <Col>
        {/* Render buttons with appropriate disabled states */}
        <ButtonWithRedirect label="Level 1" path="/quiz1" disabled={isButtonDisabled1} />
        </Col>
        <Col>
          <ButtonWithRedirect label="Level 2" path="/quiz2" disabled={isButtonDisabled2} />
        </Col>
        <Col>
          <ButtonWithRedirect label="Level 3" path="/quiz3" disabled={isButtonDisabled3} />
        </Col>
        <Col>
          <ButtonWithRedirect label="Level 4" path="/quiz4" disabled={isButtonDisabled4} />
        </Col>
        <Col>
          <ButtonWithRedirect label="Level 5" path="/quiz5" disabled={isButtonDisabled5} />
        </Col>
        <Col>
          <ButtonWithRedirect label="Level 6" path="/quiz6" disabled={isButtonDisabled6} />
        </Col>
      </Row>
      </Container>
    
    </div>
  ); 
}

export default QuizMain;