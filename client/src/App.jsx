import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Router from "./Router/Index";

import Header from "./Components/Header/Index";
import { signIn, signOut } from "./store/slices/user";
import { getUserAuth } from "./services/api.js";

function App() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuthAsync() {
      const TOKEN = localStorage.getItem("auth");
      const user = localStorage.getItem("user");
      if (TOKEN && user) {
        const res = await getUserAuth("/user/checkToken", TOKEN);
        if (res.status === 200) {
          dispatch(signIn(JSON.parse(user)));
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("auth");
          localStorage.removeItem("user");
          dispatch(signOut());
          setIsAuthenticated(false);
        }
      } else {
        const currentPath = window.location.pathname;
        if (
          currentPath !== "/legalmentions" &&
          currentPath !== "/privacypolicy"
        ) {
          navigate("/entry");
        }
      }
    }
    checkAuthAsync();
  }, [dispatch, navigate]);

  return (
    <>
      {isLogged ? <Header /> : ""}
      <Router />
    </>
  );
}

export default App;