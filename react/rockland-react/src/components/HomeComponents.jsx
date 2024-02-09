import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const HomeComponents = () => {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

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

        axios.post('http://13.250.109.11:8001/api/login', user)
            .then(response => {
                console.log(response);
                console.log(response.data);

                if (response.status === 200)
                {
                    // Navigate to another page if status == 200
                    navigate("/createAccount");
                }
                else
                {
                    console.log("fail");
                }
            });


    }




  return (
    <div>
        <div>
            <br/><br/>
            <label htmlFor="username">Username:</label>
            <input ref={usernameRef} type="text" name="username" id="username" placeholder="Enter username"/>
            <br/><br/>
            <label htmlFor="password">Password:</label>
            <input ref={passwordRef} type="password" name="password" id="password" placeholder="Enter Password"/>

            &nbsp;<button onClick={() => login()}>Login</button>
        </div>

        <h5>Sign up for free today</h5>
        <a>Click here to get started!</a>
    </div>
  )
}

export default HomeComponents
