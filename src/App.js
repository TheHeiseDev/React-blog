import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { useState } from "react";

export function App(props) {
  const getStateUserAuth = localStorage.getItem("isLoggedIn") === "true";
  const userNameLocalStorage = localStorage.getItem("login") || "";
  const [isLoggedIn, setisLoggedIn] = useState(getStateUserAuth);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        setisLoggedIn={setisLoggedIn}
        userName={userName}
      />
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <BlogPage /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginPage
                  setisLoggedIn={setisLoggedIn}
                  setUserName={setUserName}
                />
              ) : (
                <Navigate to="/blog" />
              )
            }
          />
          <Route
            exact
            path="/blog"
            element={isLoggedIn ? <BlogPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>

      <Footer year={new Date().getFullYear()} />
    </div>
  );
}
