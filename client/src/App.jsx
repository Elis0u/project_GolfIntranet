import { useEffect } from "react";
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

  useEffect(() => {
    async function checkAuth() {
      const TOKEN = localStorage.getItem("auth");
      const user = localStorage.getItem("user");
      if (TOKEN && user) {
        const res = await getUserAuth("/user/checkToken", TOKEN);
        if (res.status === 200) {
          dispatch(signIn(JSON.parse(user)));
        } else {
          localStorage.removeItem("auth");
          localStorage.removeItem("user");
          dispatch(signOut());
          navigate('/entry');
        }
      } else {
        navigate('/entry');
      }
    }
    checkAuth();
  }, [dispatch, navigate]);

  return (
    <>
      {isLogged ? <Header /> : ""}
      <Router />
    </>
  );
}

export default App;