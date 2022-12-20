import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { useState } from "react";
import { NoMatch } from "./containers/BlogPage/components/NoMatch/NoMatch";

import { BlogCardPage } from "./containers/BlogPage/components/BlogCardPage";

export function App(props) {
  const localUserAuth = localStorage.getItem("isLoggedIn") === "true";
  const localIsAdmin = localStorage.getItem("userName") === "admin";
  const localUserName = localStorage.getItem("userName");

  const [isLoggedIn, setisLoggedIn] = useState(localUserAuth);
  const [userName, setUserName] = useState(localUserName);
  const [isAdmin, setIsAdmin] = useState(localIsAdmin);

  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        setisLoggedIn={setisLoggedIn}
        userName={userName}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <BlogPage isAdmin={isAdmin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginPage
                  setisLoggedIn={setisLoggedIn}
                  setUserName={setUserName}
                  setIsAdmin={setIsAdmin}
                  isAdmin={isAdmin}
                />
              ) : (
                <Navigate to="/blog" />
              )
            }
          />
          <Route
            path="blog/:postId"
            element={
              isLoggedIn ? (
                <BlogCardPage isAdmin={isAdmin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/blog"
            element={
              isLoggedIn ? (
                <BlogPage isAdmin={isAdmin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NoMatch />} />
        </Routes>
      </main>

      <Footer year={new Date().getFullYear()} />
    </div>
  );
}
