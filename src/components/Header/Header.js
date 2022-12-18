import { NavLink } from "react-router-dom";
import style from "./Header.module.css";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BookIcon from "@mui/icons-material/Book";

export const Header = ({
  isLoggedIn,
  setisLoggedIn,
  userName,
  setIsAdmin,
  isAdmin,
}) => {
  const handleLogOut = () => {
    localStorage.clear();

    setisLoggedIn(false);
    setIsAdmin(false);
  };
  return (
    <header className={style.mainHeader}>
      {isLoggedIn ? (
        <nav>
          <div>
            <BookIcon />
            &nbsp; {isAdmin ? "Blog control" : "Blog"}
          </div>

          <strong>{userName}</strong>
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
