import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Router from "./Router/Index";

import Header from "./Components/Header/Index";
import { signIn } from "./store/slices/user";
import { getUserAuth } from "./services/api.js";

function App() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const TOKEN = localStorage.getItem("auth");
      const user = localStorage.getItem("user");
      if (TOKEN) {
        const res = await getUserAuth("/user/checkToken", TOKEN);
        if (res.status === 200) {
          dispatch(signIn(res.data.email));
        } else {
          navigate('/entry');
        }
      } else {
        navigate('/entry');
      }
      if (user) {
        dispatch(signIn(JSON.parse(user)));
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