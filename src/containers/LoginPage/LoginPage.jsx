import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export const LoginPage = (props) => {
  const navigate = useNavigate();

  const handleLogIn = (e) => {
    e.preventDefault();

    if (login === "admin") {
      if (password === "admin") {
        props.setIsAdmin(true);
      } else {
        alert("Введите правильный логин или пароль");
        return false;
      }
    }

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("userName", login);
    props.setUserName(login);
    props.setisLoggedIn(true);
    navigate("/blog", { replace: true }); //перенаправление на главную страницу после авторизации
  };
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form action="" className="loginForm" onSubmit={handleLogIn}>
      <h2>Авторизация</h2>
      <div>
        <input
          onChange={handleLoginChange}
          className="loginFormInput"
          type="text"
          placeholder="Логин"
          required
        />
      </div>
      <div>
        <input
          onChange={handlePasswordChange}
          className="loginFormInput"
          type="password"
          placeholder="Пароль"
          required
        />
      </div>
      <div>
        <button className="blackBtn" type="submit">
          Войти
        </button>
      </div>
    </form>
  );
};
