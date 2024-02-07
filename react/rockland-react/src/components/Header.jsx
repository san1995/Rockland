import "./css/Header.css"
import React from 'react'
import { Link } from 'react-router-dom'; 
import Register from "../pages/Register";

const Header = () => {
  return (
    <div>
      <div class="banner">
       
        <h2>Welcome to Rockyland</h2>
        
        
        <div>
        </div>  
      </div>

    <nav>
      <div class="topnav">
          
      <div class="navbar">
        <a href="/createAccount">Home</a> 

        <div class="dropdown">
            <button class="dropbtn">Rock Information
              <i class="fa fa-caret-down"></i>
            </button>
            
            <div class="dropdown-content">
                <a href="#">View rock distribution</a>
                <a href="#">Add Rock data</a>
                <a href="#">Update or delete Rock data</a>
            </div>
        </div> 

        <div class="dropdown">
            <button class="dropbtn">Rock Search
              <i class="fa fa-caret-down"></i>
            </button>
            
            <div class="dropdown-content">
                <a href="#">Search for rock</a>
                <a href="#">add rock to collection album</a>
              
            </div>

        </div> 


        <div class="dropdown">
            <button class="dropbtn">Quizzes
              <i class="fa fa-caret-down"></i>
            </button>
            
            <div class="dropdown-content">
                <a href="#">attempt quiz</a>
                <a href="#">track quiz progress</a>
                <a href="#">create quizzes</a>
            </div>
        </div> 

        <div class="dropdown">
            <button class="dropbtn">Rock articles
              <i class="fa fa-caret-down"></i>
            </button>
            
            <div class="dropdown-content">
                <a href="#">View rock articles</a>
                <a href="#">Create new rock article</a>
                <a href="#">approve/reject article</a>
            </div>
        </div> 

        <a href="#news">marketplace</a>
        
        <a href="#news">view profile</a>

    </div>       
    </div>
    </nav>
    </div>
  )
}

export default Header
