import UserNavbar from '../components/navbars/UserNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import React from "react";
import { useRef, useState } from "react";
import axios from 'axios';

//Quiz page 
const Quiz3 = () => {

  const getCurrentDateTimeString = () => {  //derive current datetime
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  

  const uname = localStorage.getItem('username')
  const utype = localStorage.getItem('usertype') 
  const quiz_num = "quiz3"

   // Define quiz questions with options
   //const questions = [
   //Quiz3
  const [questions, setAnswers] = useState([
  { //Q1
    question: 'What is the difference between intrusive igneous rocks and extrusive igneous rocks?',
    options: ['Crystal Size', 'Mineral Composition', 'Formation Location', 'Appearance'],
    image: '',
    correctAnswer: 'Formation Location',
    userAnswer: '',
  },
  { //Q2
    question: 'The chemical process that plays a key role in the weathering of rocks is ____. ',
    options: ['Oxidation', 'Erosion', 'Sedimentation', 'Corrosion'],
    image: '',
    correctAnswer: 'Oxidation',
    userAnswer: '',
  },
  { //Q3
    question: 'Which of the following minerals is not usually found in igneous rocks?',
    options: ['Quartz', 'Calcite', 'Pyroxenes', 'Micas'],
    image: '',
    correctAnswer: 'Calcite',
    userAnswer: ''
  },
  { //Q4
    question: 'What type of rock is coal? [Hint: Coal is formed when dead plant matter submerged in swamp environments is subjected to the geological forces of heat and pressure over hundreds of millions of years.]',
    options: ['Ore', 'Sedimentary', 'Igneous', 'Metamorphic'],
    image: 'https://drive.google.com/thumbnail?id=1BxYFE7KfxTU2COxh2f2qd-NIH8YJ3U1q',
    correctAnswer: 'Sedimentary',
    userAnswer: ''
  },
  { //Q5
    question: 'What is the Mohs hardness scale used to measure and rank?',
    options: ['Density of a rock', 'The age of rock formations', 'Scratch resistance of minerals', 'The luster of a mineral'],
    image: '',
    correctAnswer: 'Scratch resistance of minerals',
    userAnswer: ''
  },
  { //Q6
    question: 'What is the layering that occurs in sedimentary rocks called?',
    options: ['Stratification', 'Overlaying', 'Superimposing', 'Segmentation'],
    image: 'https://drive.google.com/thumbnail?id=1gdLoF-fjYXdoWz5REiilLF37u2J1p6C8',
    correctAnswer: 'Stratification',
    userAnswer: ''
  },
  { //Q7
    question: 'Pyroclastic rocks are formed from _____.',
    options: ['Solidified lava', 'Cooled magma', 'Volcanic fragments', 'Weathered sediments'],
    image: '',
    correctAnswer: 'Volcanic fragments',
    userAnswer: ''
  },
  { //Q8
    question: 'Which of the following is the process where rock mineral composition and texture is altered by heat due to contact with magma?',
    options: ['Contact Metamorphism', 'Regional Metamorphism', 'Hydrothermal Metamorphism', 'Dynamic Metamorphism'],
    image: '',
    correctAnswer: 'Contact Metamorphism',
    userAnswer: ''
  } 
  // Add more questions as needed
]);

  // Function to update userAnswer for a specific question
  const updateUserAnswer = (index, answer) => {
    setAnswers(prevQuestions => {
      // Create a copy of the questions array
      const updatedQuestions = [...prevQuestions];
      // Update userAnswer for the specified question index
      updatedQuestions[index] = {...updatedQuestions[index], userAnswer: answer};
      return updatedQuestions;
    });
  };


  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct
    console.log("Question"+currentQuestion)
    
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
     
      //questions[currentQuestion].userAnswer = selectedOption
      //console.log("read back from array")
      //console.log(questions[currentQuestion].userAnswer)
      updateUserAnswer(currentQuestion, selectedOption) //call function to record user answers
    }
    else{ //else if user select wrong answer
      //record users answer 
      //questions[currentQuestion].userAnswer = selectedOption
      //console.log("read back from array")
      //console.log(questions[currentQuestion].userAnswer)
      updateUserAnswer(currentQuestion, selectedOption) //call function to record user answers
    }
    // Move to the next question
    setCurrentQuestion(currentQuestion + 1);
    // Reset selected option
    setSelectedOption('');
  };

  const postResultDatabase = () => {
    const currentDateTimeString = getCurrentDateTimeString();
    //console.log(currentDateTimeString); 
    
    const UsernameWithoutQuotes = uname.replace(/"/g, ''); // Remove double quotes 

    console.log(UsernameWithoutQuotes); // Output: Hello, world!

     // Create an array of key-value pairs with empty values
    const user_data = {username: '', quiz_level: '', quiz_mark:'', datetime:''};
    console.log(uname)
    user_data.username = UsernameWithoutQuotes
    user_data.quiz_level = quiz_num
    user_data.quiz_mark = score //hardcode test  -
    user_data.datetime = currentDateTimeString //"2023-02-18 00:00:00"//new Date().toLocaleDateString();
    
    console.log(user_data)
  
    axios.post('https://bxevftmdmd.execute-api.ap-southeast-1.amazonaws.com/api/post_quizResult', user_data)
    .then(response => {
        console.log(response.status);
        console.log("================check data return!")
        console.log(response.data);
     
        if (response.status === 201) //request has succeeded and led to creation of resource
        {
            const token = response.data.token;  //get data from key-value pair by using key=>const extractedValue = myObject.key;
            console.log("post result succesful")
        }
        else
        {
            console.log("fail");
            
        
        }
    })
    .catch(error => { 
        console.log("post failed with error:")
        console.log(error.response.data.error)
        console.log(error)
        //post method returns 404 will be capture inside catch block. 
        //console.log("404 caught")
    

    });

  }
  const displayBadgeIfFullMarks = () => {
    if(score == 8){
      return(
        <div>
        <p>You have achieved Quiz3 champion - full marks badge!</p>
        <img src={'https://drive.google.com/thumbnail?id=1AXn-do9E9jubfMb94RB1mqZgz6DvOzQx'} alt="User Avatar" />
        </div> )
    }
  }
  const displayUserAnswers = () => {

    /* for (var key in questions) {
        console.log("user answered:")
        //console.log(questions[key].options[key])
        console.log(questions[key].userAnswer)
        console.log("read back from array")
        
    } 

    const keys = Object.keys(questions);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = questions[key];
      console.log(`Key: ${key}, question: ${value.question}, answer: ${value.correctAnswer}, your answer: ${value.userAnswer},`);
    } */

    const answerElements = [];
    for (let i = 0; i < questions.length; i++) {
      
      const question = questions[i];
      const { question: q, correctAnswer, userAnswer } = question;
      const isCorrect = correctAnswer === userAnswer;
      let answerColor = "green"; //default
      if (isCorrect) {
        answerColor = 'green';
      } else {
        answerColor = 'red';
      }
      answerElements.push(
        <div key={i}>
          <p>{q}</p>
          <p>Correct Answer: {correctAnswer}</p>
          <p>User Answer: {userAnswer}</p>
          <p style={{ color: answerColor }}>{isCorrect ? 'Correct' : 'Wrong'}</p> 
        
        </div>
      );
    }
    return answerElements;


  }

  return (
    
    <div>
        {/* Header (eg. NavBar, Banner) */}
        <UserNavbar/>
        <Container fluid style={{paddingTop:'130px'}}>
        {/* Body Content */}
        {/*ternary operator loop*/}
        {currentQuestion < questions.length ? ( 
        <div>
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion].question}</p>
          <ul>
          {questions[currentQuestion].image && <img src={questions[currentQuestion].image}/>}
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  {option}
                </label>
                
              </li>
            ))}
            
          </ul>
          <button onClick={handleNextQuestion}>Next</button>
        </div>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your score: {score} out of {questions.length}</p>
          {/* <button onClick={displayUserAnswers}>Review score</button> */}
          {displayBadgeIfFullMarks()}
          {displayUserAnswers()}
          {postResultDatabase()}
        </div>
      )}
    </Container>
        
    </div>
  )
}

export default Quiz3
