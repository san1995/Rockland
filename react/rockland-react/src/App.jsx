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

const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/createAccount" element={<CreateUser/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/rockBeginner" element={<RockBeginnerHome/>} />
        <Route path="/rockEnthusiast" element={<RockEnthusiastHome/>} />
        <Route path="/rockExpert" element={<RockExpertHome/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
