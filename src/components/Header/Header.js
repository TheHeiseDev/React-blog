import { Link, NavLink } from "react-router-dom";
import style from "./Header.module.css";

export const Header = () => {
  return (
    <header className={style.mainHeader}>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="login">Login</NavLink>
      </nav>
    </header>
  );
};
