import React from "react";
import Authentication from "./pages/Authentication/Authentication";
import Homepage from "./pages/HomePage/HomePage";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/Profile/profile";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//DONE : add the route for the About and  ContactUs ... this routes is public
//DONE : route for "seting up the profile" user after the first loging ...this route is protected
//DONE : if the user will log for the fist time send him to the profile page


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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* the not found page  */}
        <Route path="/notFound" element={<NotFound />} />

        {/* information about the app  */}
        <Route path="/About" element={<About />}></Route>
        <Route path="/About" element={<ContactUs />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
