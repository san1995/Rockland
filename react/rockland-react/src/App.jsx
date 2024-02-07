import { useRef, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"


// Pages
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import Register from "./pages/Register";

const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/createAccount" element={<CreateUser/>} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
