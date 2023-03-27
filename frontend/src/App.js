import React from "react";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from "react-router-dom";
import Cards from "./pages/Cards";
import HomePage from "./pages/HomePage";
import AuthContextProvider, { authContext } from "./utils/auth";
import Navbar from "./components/Navbar";
import RequireAuth from "./utils/RequireAuth";
import SignupPage from "./pages/SignupPage";
import CardDetails from "./pages/CardDetails";
import SingleCard from "./pages/SingleCard";
import UpdateCard from "./pages/UpdateCard";

function App() {
  return (
    <AuthContextProvider>
    <Router>
    <div className="flex flex-row">
      <Navbar />
    <Routes>
    <Route path="/cards" element={<RequireAuth><Cards /></RequireAuth>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signin" element={<SignupPage />} />
    <Route path="/details" element={<CardDetails />} />
    <Route exact path="/" element={<HomePage />} />
    <Route path="/singlecard/:id" element={ <SingleCard /> }/>  
    <Route path="/updatecard/:id" element={ <UpdateCard /> }/>
    </Routes>
    </div>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
