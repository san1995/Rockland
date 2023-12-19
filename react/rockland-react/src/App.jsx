import { useRef, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"

// Pages
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";

const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/createAccount" element={<CreateUser/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
