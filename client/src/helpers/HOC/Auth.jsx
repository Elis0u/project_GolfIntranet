import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/slices/user";
import { getUserAuth } from "../../services/api.js";

function HOCAuth({ child, auth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const Child = child;

  useEffect(() => {
    async function checkAuth() {
      if (auth) {
        const TOKEN = localStorage.getItem("auth");
        let res = null;
        if (TOKEN) {
          res = await getUserAuth("/user/checkToken", TOKEN);
          console.log(res);
          if (res.status === 200) setIsAuthorized(true);
        }
        if (res.code || !TOKEN) {
          dispatch(signOut());
          navigate("/entry");
        }
      }
    }
    checkAuth();
  });

  if (isAuthorized) return <Child />;
  return null;
}

export default HOCAuth;