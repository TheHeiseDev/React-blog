import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export const Header = ({ isLoggedIn, setisLoggedIn, userName }) => {
  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", false);
    setisLoggedIn(false);
  };
  return (
    <header className={style.mainHeader}>
      {isLoggedIn ? (
        <nav>
          Добро пожаловать, &nbsp;<strong>{userName}</strong>
          <NavLink onClick={handleLogOut} exact to="/login">
            <MeetingRoomIcon />
            Выход
          </NavLink>
        </nav>
      ) : (
        "Добро пожаловать "
      )}
    </header>
  );
};
