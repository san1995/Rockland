import UserNavbar from '../components/navbars/UserNavbar'
import { Container, Row, Col, Form, Button} from 'react-bootstrap'
import React from "react";
import { useRef, useState } from "react";
import axios from 'axios';

//Quiz page 
const Quiz5 = () => {

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
  const quiz_num = "quiz5"

   // Define quiz questions with options
   //const questions = [
  //Quiz5
  const [questions, setAnswers] = useState([
  { //Q1
    question: 'What is the primary difference between contact metamorphism and regional metamorphism?',
    options: ['Pressure intensity and temperature', 'Scale and distance from heat source', 'Presence of specific minerals', 'Type of rock undergoing metamorphism'],
    image: '',
    correctAnswer: 'Scale and distance from heat source',
    userAnswer: '',
  },
  { //Q2
    question: 'What metamorphic rock has a Pencil Structure and is often used in pencils?',
    options: ['Graphite', 'Slate', 'Marble', 'Phyllite'],
    image: '',
    correctAnswer: 'Slate',
    userAnswer: '',
  },
  { //Q3
    question: 'The presence of stromatolites within a sedimentary rock suggests its formation in _____.',
    options: ['a deep sea environment', 'a desert environment', 'shallow waters', 'a volcanic hot spring environment'],
    image: '',
    correctAnswer: 'shallow waters',
    userAnswer: ''
  },
  { //Q4
    question: 'What is an intrusive igneous rock with a similar composition to basalt but has a coarse-grained texture called?',
    options: ['Gabbro', 'Granite', 'Dacite', 'Obsidian'],
    image: '',
    correctAnswer: 'Gabbro',
    userAnswer: ''
  },
  { //Q5
    question: 'What is an extrusive igneous rock with a similar composition to granite but has a finer-grained texture called?',
    options: ['Rhyolite', 'Basalt', 'Obsidian', 'Gabbro'],
    image: '',
    correctAnswer: 'Rhyolite',
    userAnswer: ''
  },
  { //Q6
    question: 'What is the primary process that lithifies sedimentary rocks?',
    options: ['Crystallization', 'Compaction', 'Cementation', 'Metamorphism'],
    image: '',
    correctAnswer: 'Compaction',
    userAnswer: ''
  },
  { //Q7
    question: 'What can the study of inclusions provide information about?',
    options: ['The age of the rock', 'The presence of past volcanic activity', 'The conditions in which the rock was formed', 'The type of original magma the rock formed from'],
    image: '',
    correctAnswer: 'The conditions in which the rock was formed',
    userAnswer: ''
  },
  { //Q8
    question: 'What phenomenon might cause the formation of a xenolith?',
    options: ['Faulting and displacement', 'Contact metamorphism and assimilation', 'Erosion and displacement', 'Weathering and dissolution'],
    image: '',
    correctAnswer: 'Contact metamorphism and assimilation',
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
        <p>You have achieved Quiz5 champion - full marks badge!</p>
        <img src={'https://drive.google.com/thumbnail?id=15y27Drs7ln9kRkfaQJh_FDU9p4dH7yNP'} alt="User Avatar" />
        
        
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

export default Quiz5
