import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "./Router/Index";

import Header from "./Components/Header/Index";
import { signIn } from "./store/slices/user";
import { getUserAuth } from "./services/api.js";

function App() {
  const isLogged = useSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkAuth() {
      const TOKEN = localStorage.getItem("auth");
      if (TOKEN) {
        const res = await getUserAuth("/user/checkToken", TOKEN);
        if (res.status === 200) {
          dispatch(signIn(res.data.email));
        }
      }
    }
    checkAuth();
  }, [dispatch]);

  return (
    <>
      {isLogged ? <Header /> : ""}
      <Router />
    </>
  );
}

export default App;