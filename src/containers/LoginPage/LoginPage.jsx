import "./LoginPage.css";

export const LoginPage = () => {
  const handleLogIn = (e) => {
    e.preventDefault();
  };

  return (
    <form action="" className="loginForm" onSubmit={handleLogIn}>
      <h2>Авторизация</h2>
      <div>
        <input className="loginFormInput" type="text" placeholder="Логин" required />
      </div>
      <div>
        <input className="loginFormInput" type="password" placeholder="Пароль" required />
      </div>
      <div>
        <button className="blackBtn" type="submit">
          Войти
        </button>
      </div>
    </form>
  );
};
