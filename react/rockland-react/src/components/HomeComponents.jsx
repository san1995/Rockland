//import "../components/css/Error.css"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IndexNavbar from '../components/navbars/IndexNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import bgimg from "../assets/rockbanner1.png";


//login
const HomeComponents = () => {

   //const username = "123test"
   //const usertype = "admin"
   
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    
    
    const login = () => {

        // Get value from the input
        const user = {username: usernameRef.current.value, password: passwordRef.current.value};
        // Reset the value after assigning it to user object
        usernameRef.current.value = "";
        passwordRef.current.value = "";


        // Check user object on console
        console.log(user);

        // API Call using axios
        const headers = {
            // in the future can include Authroization headers here to put the Token you get from login
            // "Authorization" : "Token fmkdsfnssdfjiaenqkedas"
        };
        
        
        axios.post('https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/login', user)
            .then(response => {
                console.log(response.status);
                console.log("================check data return!")
                console.log(response.data);
                //username = get_username_from_token(response.data.token)
                
                
                //handleSetValues(response.data.username, "rock learner"); //to do, get corresponing user type string from db and set accordingly!!

                if (response.status === 200)
                {
                    let response_usertype = ""
                   
                    const token = response.data.token;  //get data from key-value pair by using key=>const extractedValue = myObject.key;
                    console.log("token value: " + token)
                    //const usertype = response.data.user.last_name //use lastname field to store user type
                    //console.log(usertype)
                    
                    //update global vars
                    localStorage.setItem('username', JSON.stringify(response.data.user.username))
                    localStorage.setItem('token', JSON.stringify(token))
                  
                    //nested axios call - if user login successfull, get usertype from user_profile table api call
                    // Define your base URL and endpoint
                    const baseUrl2 = 'https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/';
                    const endpoint2 = 'user_profile';
                    var input = `${baseUrl2}${endpoint2}/${response.data.user.username}`
                    var urlwithoutdoublequote2 = input.replaceAll("\"", ""); //get rid of excess char

                    // Make the get request to https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/user_profile to get data from user_profile table
                    axios.get(urlwithoutdoublequote2)
                    //axios.get(`${baseUrl}{uname}`, { headers })
                    .then(response => {
                        // Handle successful response
                        console.log("call /api/user_profile data:")
                        console.log(response.data);
                        //update global vars
                        localStorage.setItem('usertype', JSON.stringify(response.data.usertype))
                        if(response.data.usertype == "3"){ //direct to different pages for diff usertypes
                            navigate("/rockBeginner");
                        }
                        else if(response.data.usertype == "4"){
                            navigate("/rockEnthusiast");
                        }
                        else if(response.data.usertype == "5"){
                            navigate("/rockExpert");
                        }

                    })
                    .catch(error => {
                        // Handle error
                        console.error('Error:', error);
                    });
                    
                }
                else
                {
                    console.log("fail");
                    {/* Display error message if it exists */}
                    setErrorMessage('Failed to login. Please try again.');
                     
                
                }
            })
            .catch(error => { 
                console.log(error.response.data.error)
                //post method returns 404 will be capture inside catch block. 
                //console.log("404 caught")
                setErrorMessage('Incorrect username or password! please try again');

            });


    }




  return (
    <div>
        <div  style={{height: "100vh",
                backgroundImage:
                `url(${bgimg})`, backgroundSize:"cover"}} className="d-flex align-items-center">
        <IndexNavbar/>
        <Container fluid style={{backgroundColor:'white', width:'50%', height:'50%', border: '2px solid #fff', borderRadius: '10px'}}>
            <Row className="justify-content-center">
            <Col xs={12} md={6}> {/* Specify the column size for different screen sizes */}
            <div style={{paddingTop:'15%'}}>
                <label htmlFor="username">Username </label>
                <input ref={usernameRef} type="text" className="form-control" name="username" id="username" placeholder="Enter username"/>
                <br/><br/>
                <label htmlFor="password">Password </label>
                <input ref={passwordRef} type="password" className="form-control" name="password" id="password" placeholder="Enter Password"/>
                

                &nbsp;<button onClick={login} style={{ marginTop: '15px' }}>Login</button>
            </div>

            {/* Display error message if it exists */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            </Col>
            </Row>
        </Container>    
        </div>

       
     
    </div>
  )
}



export default HomeComponents
