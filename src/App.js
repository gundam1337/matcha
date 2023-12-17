import "./App.css";
import React from "react";
import Authentication from "./pages/Authentication/Authentication";
import Homepage from "./pages/HomePage/HomePage";
import NotFound from "./pages/NotFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//FIXME : every route shoud take its style 
//FIXME : u can't just enter the home , how to prtect the home route 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
