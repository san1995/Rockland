import UserNavbar from '../components/navbars/UserNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import {React, useEffect} from "react";
import { useState } from 'react';
import axios from 'axios';
import "../components/css/UserProfile.css"
import avatar from "../assets/displaypic.jpg";

//homepage after user login!

const ViewProfile = () => {
  //const { username, userType, setUsername, setUserType } = useContext(UserContext); //storing username _ usertype
  // Example user data
  const [userData, setUserData] = useState({
    imageUrl: avatar, // default for all users 
    username:'', //pull from globals
    userlvl:'', //pull from user_profile
    email:'', //pull from authuser
    dateOfBirth: '', //pull from user_profile table
    gender:'',       //pull from user_profile 
    //joinedDate: '', //pull from authuser table
  });

  const [BadgesObject, setMyBadge] = useState({ 
    0: {'achieved':'false', 'date':'', 'description':'place holder', 'imgurl':'https://drive.google.com/thumbnail?id=1gbwz8wiM9L9BCStvRQ0-8MG-t-lLXDLz' }, 
    1: {'achieved':'', 'date':'', 'description':'register for rockland account!', 'imgurl':'https://drive.google.com/thumbnail?id=1gbwz8wiM9L9BCStvRQ0-8MG-t-lLXDLz' }, 
    2: {'achieved':'', 'date':'', 'description':'full marks for quiz1', 'imgurl':'https://drive.google.com/thumbnail?id=13RLNN2tVDM3tBLza6_sUndZcKWM7Q34T' }, 
    3: {'achieved':'', 'date':'', 'description':'full marks for quiz2', 'imgurl':'https://drive.google.com/thumbnail?id=1j7p9kpstaXiXqPm1fVNRJCZzZVjww0kC' }, 
    4: {'achieved':'', 'date':'', 'description':'level up to rock enthusiast', 'imgurl':'https://drive.google.com/thumbnail?id=1T91WVV0OsZ4s77ibwwq0xbCdsn73PXAW' }, 
    5: {'achieved':'', 'date':'', 'description':'full marks for quiz3', 'imgurl':'https://drive.google.com/thumbnail?id=1AXn-do9E9jubfMb94RB1mqZgz6DvOzQx' }, 
    6: {'achieved':'', 'date':'', 'description':'full marks for quiz4', 'imgurl':'https://drive.google.com/thumbnail?id=160x3Wf2FhS8lPI0_UY0lANr4i8UG54Rs' }, 
    7: {'achieved':'', 'date':'', 'description':'level up to rock expert', 'imgurl':'https://drive.google.com/thumbnail?id=1NL7Cv3TBz804c7LHWBQbf_hnuwfTELh5' }, 
    8: {'achieved':'', 'date':'', 'description':'full marks for quiz5', 'imgurl':'https://drive.google.com/thumbnail?id=15y27Drs7ln9kRkfaQJh_FDU9p4dH7yNP' }, 
    9: {'achieved':'', 'date':'', 'description':'full marks for quiz6', 'imgurl':'https://drive.google.com/thumbnail?id=1hCX_UEGh1YytzptcxMFD2NYhOZ4G4ePA' },
   
  });

  const updateUserData = (fieldname, value) => {
    setUserData(prevUserData => ({
      ...prevUserData, //write back existing data to object
      [fieldname]: value //provide key-value pair as input and update value accordingly 
    }));
  };

  //updateUserData('dateOfBirth', '1/1/2021')
  //updateUserData('email', '123@gmail.com')

  //console.log("=================!!!!!!!!!")
  //console.log(userData)
  
  //console.log("badgesObject original:")
  //console.log(BadgesObject[1])
   // Function to update a specific nested property of the badgesObject
   const updateBadgeProperty = (badgeIndex, property, value) => {
    setMyBadge(prevState => ({
      ...prevState,
      [badgeIndex]: {
        ...prevState[badgeIndex],
        [property]: value
      }
    }));
  };

  // Example usage to update the 'achieved' property of badge at index '0'
  const handleUpdateBadge = (index, field, value) => {
    //updateBadgeProperty('0', 'achieved', 'true');
    updateBadgeProperty(index, field, value);
  };

  useEffect(() => { //do fetchdata only once upon page load. to prevent page loading loop indefinitely
   
    //console.log("====================================")
    //console.log(userData)
    
    //const fetchData = async () => {
    const fetchData = () => {
      const uname = localStorage.getItem('username')
      const utype = localStorage.getItem('usertype')
      const token = localStorage.getItem('token')
      const token_WithoutQuotes = token.replace(/"/g, ''); // Remove double quotes 
      //const token_padding = "Token d8590f1ec17fd106bb04cd1cc56a27df9a28ebc3" testing use ONLY
      var mystr = "Token ";
      
      //console.log("username: "+ uname)
      const result = `${mystr} ${token_WithoutQuotes}`;

      //console.log("check token string")
      //console.log(result)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': result //token_padding
      }
      //console.log("auth: " + result)
      //var get_req_url = "http://127.0.0.1:8000/api/users/" + uname
      //let url = new URL("http://127.0.0.1:8000/api/users/userTest2");
      //let params = new URLSearchParams(url.search);
      
      // Define your base URL and endpoint
      const baseUrl = 'http://127.0.0.1:8000/api/';
      const endpoint = 'users';

      // Define the string value you want to append to the URL
      const stringValue = '';
    
      const requestData = {
          "username":uname,
          "password":"12345"
      };
      //console.log("debug url")
      var input = `${baseUrl}${endpoint}/${uname}`
      var urlwithoutdoublequote = input.replaceAll("\"", ""); 

      // Make the get request to http://127.0.0.1:8000/api/users/userTest2 to get data from auth_user table
      axios.get(urlwithoutdoublequote, { headers }) //added await to ensure each request executed in sequential 
      //axios.get(urlwithoutdoublequote)
      .then(response => {
        // Handle successful response
        console.log("call /api/users data:")
        //console.log(response.data);
        //console.log("line 110" + response.data.email)
        updateUserData('username',response.data.username)
        updateUserData('email',response.data.email)
        //updateUserData('joinedDate',response.data.date_joined)
       //console.log(userData)
       
        
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });


      // Define your base URL and endpoint
      const baseUrl2 = 'http://127.0.0.1:8000/api/';
      const endpoint2 = 'user_profile';
      var input = `${baseUrl2}${endpoint2}/${uname}`
      var urlwithoutdoublequote2 = input.replaceAll("\"", ""); //get rid of excess char

      // Make the get request to http://127.0.0.1:8000/api/user_profile to get data from user_profile table
      axios.get(urlwithoutdoublequote2)
      //axios.get(`${baseUrl}{uname}`, { headers })
      .then(response => {
        // Handle successful response
        console.log("call /api/user_profile data:")
        //console.log(response.data);
        updateUserData('dateOfBirth',response.data.dob)
        updateUserData('gender',response.data.gender)
        if(response.data.usertype == '3'){
          updateUserData('userlvl', 'Rock Beginner')
        }else if(response.data.usertype == '4'){
          updateUserData('userlvl','Rock Enthusiast')
        }else if(response.data.usertype == '5'){
          updateUserData('userlvl','Rock Expert')
        }else{
          updateUserData('userlvl', 'Rock Beginner')
        }
        
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });

      // Define your base URL and endpoint
      const baseUrl3 = 'http://127.0.0.1:8000/api/'; //api/badge/<str:username>
      const endpoint3 = 'badge';
      var input = `${baseUrl3}${endpoint3}/${uname}`
      var urlwithoutdoublequote3 = input.replaceAll("\"", ""); //get rid of excess char

      // Make the get request to http://127.0.0.1:8000/api/badge/<str:username> to get data from user_profile table
      axios.get(urlwithoutdoublequote3)
      //axios.get(`${baseUrl}{uname}`, { headers })
      .then(response => {
        // Handle successful response
        console.log("call /api/user_badges data:")
        console.log(response.data);
        //iterate through data returned 
        const data_returned = response.data

        //format '9': {'achieved':'', 'date':'', 'description':'new user', 'imgurl':'' },
        //updateBadgeProperty(1, 'achieved', 'true'); //index, field, value
        //console.log("badgesObject updated:")
        //console.log(BadgesObject[1]['description']) //access like a 2d arr?
        
        /*if(BadgesObject['0']['date'] === ''){
           console.log("null value read!")
        }
        else{
          console.log("value exist:" + BadgesObject['0']['date'])
        } */
      
        for (const [key, value] of Object.entries(data_returned)) {
          console.log("line 184:")
          console.log(value.badge_id +" "+ value.date_achieved)
          /* if(value.badge_id == '2'){
            console.log("value.badge_id == 2")
          }else{
            console.log("value.badge_id not equal to 2")
          } */

        //this logic check to ensure no duplicate badges read into our object
         if(BadgesObject[Number(value.badge_id)]['date'] === ''){ //iterate through badge index | if badge['id']['date'] not populated.. 
            console.log("null value read!")  
            //format '9': {'achieved':'', 'date':'', 'description':'new user', 'imgurl':'' },
            console.log("****************************:" + value.date_achieved)
            updateBadgeProperty(Number(value.badge_id), 'achieved', 'true'); //index, field, value    convert value.badge_id to number
            updateBadgeProperty(Number(value.badge_id), 'date',  value.date_achieved); //index, field, value

         }
         else{
            /*pass - do nothing*/
         }
        
        }
      

      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
    }
  fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once on component mount


  return (
    <div>
      {/* Header (eg. NavBar, Banner) */}
      <UserNavbar/>
      <Container fluid style={{ paddingTop: '130px' }}>
        <Row>
          <Col xs={12} md={6}>
            <div className="user-profile">
              <div className="profile-image">
                <img src={userData.imageUrl} alt="User Avatar" />
              </div>
              <div className="profile-details">
                <p>Username: {userData.username}</p>
                <p>User Level: {userData.userlvl}</p>
                <p>Email: {userData.email}</p>
                <p>Gender: {userData.gender}</p>
                <p>Date of Birth: {userData.dateOfBirth}</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="container">
              <p>Achieved Badges!</p>
              {/* Loop through BadgesObject */}
              <Row>
                {Object.keys(BadgesObject).map(key => {
                  const badge = BadgesObject[key];
                  // Check if achieved is true
                  if (badge.achieved === 'true') {
                    return (
                      <Col key={key} xs={6} md={3}>
                        {/* Adjust the xs and md values as needed */}
                        <div>
                          <img src={badge.imgurl} alt={badge.description} />
                          <p>Achieved Date: {badge.date}</p>
                          <p>Description: {badge.description}</p>
                        </div>
                      </Col>
                    );
                  }
                  return null;
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ViewProfile
