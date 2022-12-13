import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { useState } from "react";

export function App(props) {
  const getStateUserAuth = localStorage.getItem("isLoggedIn") === "true";
  const userNameLocalStorage = localStorage.getItem("login") || "";
  const [isLoggedIn, setisLoggedIn] = useState(getStateUserAuth);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} setisLoggedIn={setisLoggedIn} userName={userName} />
        <main>
          <Routes>
            <Route exact path="/" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage setisLoggedIn={setisLoggedIn} setUserName={setUserName} />} />
          </Routes>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
