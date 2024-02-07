import "./css/Header.css"
import React from 'react'
import { Link } from 'react-router-dom'; 
import Register from "../pages/Register";
import rockicon from "../assets/rockiconsmaller.jpg";


const HeaderLandingPage = () => {
  return (
        <div>
        
        <div className ="container"> 
              <img src={rockicon} alt="rock logo" />
        </div>

        <div class="tagline">
          <p>Interactive rock e-learning!</p>
        </div>
          
          <nav>
            <div class="topnav">
                  
              <div class="navbar">

              <div class = "topnav-right">
                <a href="/Home">Login</a> 
                <a href="/createAccount">Create Account</a>
                
              </div>       
            </div>
            </div>
          </nav>

          
           
        

        </div>

      
 
   
  )
}

export default HeaderLandingPage
