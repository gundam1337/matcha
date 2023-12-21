import "./App.css";
import React from "react";
import Authentication from "./pages/Authentication/Authentication";
import Homepage from "./pages/HomePage/HomePage";
import NotFound from "./pages/NotFound/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

//FIXME : every route shoud take its style
//FIXME : u can't just enter the home , how to prtect the home route
//FIXME : fix the golbal css and make each route have thier style css
//TODO  : fix the Notfound
//
function App() {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Authentication />} />

        {/* private routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        {/* the not found page  */}
        <Route path="/" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default App;
