import { useRef, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"


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

const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path="/login" element={<Home/>} />
        <Route path="/createAccount" element={<CreateUser/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/rockBeginner" element={<RockBeginnerHome/>} />
        <Route path="/rockEnthusiast" element={<RockEnthusiastHome/>} />
        <Route path="/rockExpert" element={<RockExpertHome/>}/>
        <Route path="/forumTopics" element={<ForumTopicsPage/>}/>
        <Route path="/forumThreads/:fid" element={<ForumThreadsPage/>}/>
        <Route path="/forumNewThread/:fid" element={<ForumNewThreadPage/>}/>
        <Route path="/forumComments/:threadid" element={<ForumCommentPage/>}/>
        <Route path="/rockCatalogue" element={<RockCatalogue/>} />
        
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
