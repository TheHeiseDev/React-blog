import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Blog } from "./pages/Blog/Blog";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/Login/Login";
import { useState } from "react";
import { NoMatch } from "./pages/NoMatch/NoMatch";

import { SingleBlogPost } from "./pages/SingleBlogPost/SingleBlogPost";

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
              isLoggedIn ? <Blog isAdmin={isAdmin} /> : <Navigate to="/login" />
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
                <SingleBlogPost isAdmin={isAdmin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/blog"
            element={
              isLoggedIn ? <Blog isAdmin={isAdmin} /> : <Navigate to="/login" />
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
