import React from "react";
import Authentication from "./pages/Authentication/Authentication";
import Homepage from "./pages/HomePage/HomePage";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/Profile/profile";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
