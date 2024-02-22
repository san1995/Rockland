import { useRef, useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

// Pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import Register from "./pages/Register";
import RockLearning from "./components/views/RockBeginnerHome";
import RockBeginnerHome from "./components/views/RockBeginnerHome";
import RockEnthusiastHome from "./components/views/RockEnthusiastHome";
import RockExpertHome from "./components/views/RockExpertHome";
import ForumTopicsPage from "./components/views/ForumTopicsPage";
import ForumThreadsPage from "./components/views/ForumThreadsPage";
import ForumNewThreadPage from "./components/views/ForumNewThreadPage";
import ForumCommentPage from "./components/views/ForumCommentPage";
import RockCatalogue from "./components/views/RockCatalogue";

import ViewProfile from "./pages/ViewProfile";
import LogoutPage from "./components/LogoutPage";
import QuizMain from "./pages/QuizMain";
import Quiz1 from "./pages/Quiz1";
import Quiz2 from "./pages/Quiz2";
import Quiz3 from "./pages/Quiz3";
import Quiz4 from "./pages/Quiz4";
import Quiz5 from "./pages/Quiz5";
import Quiz6 from "./pages/Quiz6";
import HomeComponents from "./components/HomeComponents";

const App = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // useEffect(() => {
  //   // Your logic here will run every time App.jsx is rendered
  //   console.log('App component rendered');
  //   //very time App.jsx is rendered
  //   //if( localStorage.setItem('username', JSON.stringify(response.data.user.username)))
  //   if (localStorage.getItem('username') === null) {
  //       console.log("uname:" + localStorage.getItem('username'))
  //       setIsLoggedIn(false)
  //   }else{
  //     console.log("uname:" + localStorage.getItem('username'))
  //     setIsLoggedIn(true)
  //   }
  //   console.log("islogin" + isLoggedIn)
  // }, [isLoggedIn]);



  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path="/login" element={<HomeComponents/>} />
        <Route path="/createAccount" element={<CreateUser/>} />
        <Route path="/Register" element={<Register/>} />
        {isLoggedIn && ( <>
          
          <Route path="/rockBeginner" element={<RockBeginnerHome/>} />
          <Route path="/rockEnthusiast" element={<RockEnthusiastHome/>} />
          <Route path="/rockExpert" element={<RockExpertHome/>}/>
          <Route path="/forumTopics" element={<ForumTopicsPage/>}/>
          <Route path="/forumThreads/:fid" element={<ForumThreadsPage/>}/>
          <Route path="/forumNewThread/:fid" element={<ForumNewThreadPage/>}/>
          <Route path="/forumComments/:threadid" element={<ForumCommentPage/>}/>
          <Route path="/rockCatalogue" element={<RockCatalogue/>} />
          
          <Route path="/viewprofile" element={<ViewProfile/>} />
          <Route path="/quizmain" element={<QuizMain/>} />
          <Route path="/quiz1" element={<Quiz1/>} />
          <Route path="/quiz2" element={<Quiz2/>} />
          <Route path="/quiz3" element={<Quiz3/>} />
          <Route path="/quiz4" element={<Quiz4/>} />
          <Route path="/quiz5" element={<Quiz5/>} />
          <Route path="/quiz6" element={<Quiz6/>} />
          <Route path="/logout" element={<LogoutPage/>} />
          </>
        )}
        
      </Routes>
      </BrowserRouter>
    </div>
  )
 }
export default App