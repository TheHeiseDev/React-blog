import { Blog } from "./pages/Blog/Blog";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/Login/Login";
import { NoMatch } from "./pages/NoMatch/NoMatch";
import { SingleBlogPost } from "./pages/SingleBlogPost/SingleBlogPost";

export const AppRoutes = ({
  isLoggedIn,
  setisLoggedIn,
  setUserName,
  isAdmin,
  setIsAdmin,
}) => {
  return (
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
  );
};
