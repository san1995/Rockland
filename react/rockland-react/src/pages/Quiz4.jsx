
import React from "react";
import UserNavbar from '../components/navbars/UserNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import { useRef, useState } from "react";
import axios from 'axios';

//Quiz page 
const Quiz4 = () => {

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
  const quiz_num = "quiz4"

  // Define quiz questions with options
  //const questions = [
  //Quiz4
  const [questions, setAnswers] = useState([
  { //Q1
    question: 'What is another term for intrusive igneous rocks and extrusive igneous rocks?',
    options: ['Plutonic rocks and Volcanic rocks', 'Endogenous rocks and Exogenous rocks', 'Metamorphic rocks and Sedimentary rocks', 'Hydrothermal rocks and Pyroclastic rocks'],
    image: '',
    correctAnswer: 'Plutonic rocks and Volcanic rocks',
    userAnswer: '',
  },
  { //Q2
    question: 'If a sedimentary rock had ripple marks within it, how is it likely formed?',
    options: ['In a deep ocean environment', 'Deposited by wind', 'In shallow waters with wave actions', 'Undergoing significant metamorphism'],
    image: '',
    correctAnswer: 'In shallow waters with wave actions',
    userAnswer: '',
  },
  { //Q3
    question: 'Which factor is most likely to affect sandstone porosity?',
    options: ['Chemical composition', 'Size and sorting of sand grains', 'Pyroxenes', 'Micas'],
    image: '',
    correctAnswer: 'Size and sorting of sand grains',
    userAnswer: ''
  },
  { //Q4
    question: 'What are the vertical cracks or breaks that may form in rocks due to pressure or movement called?',
    options: ['Folds', 'Joints', 'Faults', 'Ravines'],
    image: '',
    correctAnswer: 'Joints',
    userAnswer: ''
  },
  { //Q5
    question: 'Which of the following statements is incorrect?',
    options: ['Weathering can break down rocks physically and chemically.', 'Weathering is more common in warm and humid climates.', 'Weathering has a crucial role in soil formation.', 'Weathering only affects the surface area of rocks.'],
    image: '',
    correctAnswer: 'Weathering only affects the surface area of rocks.',
    userAnswer: ''
  },
  { //Q6
    question: 'Which of the following is not a weathering type?',
    options: ['Mechanical weathering', 'Chemical weathering', 'Biological weathering', 'Transactional weathering'],
    image: '',
    correctAnswer: 'Transactional weathering',
    userAnswer: ''
  },
  { //Q7
    question: 'What does the presence of well-rounded pebbles in a conglomerate sedimentary rock suggest?',
    options: ['It was formed deep in the ocean', 'It went through a lot of chemical weathering', 'It may have been moved by a stream', 'It was exposed to high pressure and temperature'],
    image: '',
    correctAnswer: 'It may have been moved by a stream',
    userAnswer: ''
  },
  { //Q8
    question: 'Which of the following primarily impacts the density of sedimentary rocks?',
    options: ['Porosity', 'Minerals making up the rock', 'Surface area', 'Temperature'],
    image: '',
    correctAnswer: 'Porosity',
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
        <p>You have achieved Quiz4 champion - full marks badge!</p>
        <img src={'https://drive.google.com/thumbnail?id=160x3Wf2FhS8lPI0_UY0lANr4i8UG54Rs'} alt="User Avatar" />
        <p>You have leveled up to Rock Expert!</p>
        <img src={'https://drive.google.com/thumbnail?id=1NL7Cv3TBz804c7LHWBQbf_hnuwfTELh5'} alt="User Avatar" />
        
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

export default Quiz4
