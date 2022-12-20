import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import { useState } from "react";
import { AppRoutes } from "./AppRoutes";

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
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setisLoggedIn={setisLoggedIn}
          setUserName={setUserName}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
      </main>

      <Footer year={new Date().getFullYear()} />
    </div>
  );
}
