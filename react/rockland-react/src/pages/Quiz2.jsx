import Header from "../components/Header"
import HomeComponents from "../components/HomeComponents"
import React, { useContext } from "react";
import { useRef, useState } from "react";
import { UserContext, UserProvider } from '../components/UserContext';
import axios from 'axios';

//Quiz page 
const Quiz2 = () => {

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
  const quiz_num = "quiz2"

  // Define quiz questions with options
  //const questions = [
  //Quiz2
  const [questions, setAnswers] = useState([
  { //Q1
    question: 'What kind of rock is the main component in making cement? ',
    options: ['Limestone', 'Chalk', 'Granite', 'Basalt'],
    image: 'https://drive.google.com/thumbnail?id=1gFFB6b0S4B8AxkFZZZm1O7LBM9laTA66',
    correctAnswer: 'Limestone',
    userAnswer: '',
  },
  { //Q2
    question: 'What is the rock cycle?',
    options: ['The process of weathering and erosion', 'The sequence of rock transformation over time', 'Minerals that make up a rock', 'The study of different rock types'],
    image: 'https://drive.google.com/thumbnail?id=128gGqtyBxmUKMs6NG7EujEmiRlWx6MaB',
    correctAnswer: 'The sequence of rock transformation over time',
    userAnswer: '',
  },
  { //Q3
    question: 'What kind of rocks are fossils found in? ',
    options: ['Ore', 'Igneous', 'Sedimentary', 'Metamorphic'],
    image: 'https://drive.google.com/thumbnail?id=1dsWFcbIrbtho9X18lAuiChOZBea_rW5a',
    correctAnswer: 'Sedimentary',
    userAnswer: ''
  },
  { //Q4
    question: 'What is the definition of a rock?',
    options: ['A solid mass of mineral material or other matter that occurs naturally', 'A hard, solid object found on Earth', 'A lump of dirt or sand', 'A loose collection of mineral particles'],
    image: '',
    correctAnswer: 'A solid mass of mineral material or other matter that occurs naturally',
    userAnswer: ''
  },
  { //Q5
    question: 'What is the process of breaking down a rock by wind, rain or ice called?',
    options: ['Depression', 'Weathering', 'Sedimentation', 'Erosion'],
    image: 'https://drive.google.com/thumbnail?id=1iMrfHjpidTXii-KURi0wnB-IeNO73XhZ',
    correctAnswer: 'Weathering',
    userAnswer: ''
  },
  { //Q6
    question: 'What is molten rock material called?',
    options: ['Lava', 'Sediment', 'Mantle', 'Magma'],
    image: '',
    correctAnswer: 'Magma',
    userAnswer: ''
  },
  { //Q7
    question: 'What are the two type of igneous rocks?',
    options: ['Intrusive and Inclusive', 'Extrusive and Volcanic', 'Intrusive and Extrusive', 'Volcanic and Intrusive'],
    image: '',
    correctAnswer: 'Intrusive and Extrusive',
    userAnswer: ''
  },
  { //Q8
    question: 'Which of the following about igneous rocks is true?',
    options: ['Intrusive igneous rocks generally has rough textures and Extrusive igneous rocks generally have smooth textures', 'Intrusive igneous rocks generally have smooth textures and Extrusive igneous rocks generally have rough textures', 'All igneous rocks generally have smooth textures', 'All igneous rocks generally have rough textures'],
    image: '',
    correctAnswer: 'Intrusive igneous rocks generally has rough textures and Extrusive igneous rocks generally have smooth textures',
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
  
    axios.post('http://127.0.0.1:8000/api/post_quizResult', user_data)
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
        <p>You have achieved Quiz2 champion - full marks badge!</p>
        <img src={'https://drive.google.com/thumbnail?id=1j7p9kpstaXiXqPm1fVNRJCZzZVjww0kC'} alt="User Avatar" />
        <p>You have leveled up to Rock Enthusiast!</p>
        <img src={'https://drive.google.com/thumbnail?id=1T91WVV0OsZ4s77ibwwq0xbCdsn73PXAW'} alt="User Avatar" />
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
        <Header/>
        
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
   
        
    </div>
  )
}

export default Quiz2
