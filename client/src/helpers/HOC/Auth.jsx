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
          try {
            res = await getUserAuth("/user/checkToken", TOKEN);
            if (res.status === 200) setIsAuthorized(true);
          } catch (err) {
            if (err.response && err.response.status === 401) {
              res = { status: 401 };
            }
          }
        }
        if (!res || res.status === 401 || !TOKEN) {
          dispatch(signOut());
          localStorage.removeItem("auth");
          localStorage.removeItem("user");
          navigate("/entry");
        }
      }
    }
    checkAuth();
  }, [auth, dispatch, navigate]);

  if (isAuthorized) return <Child />;
  return null;
}

export default HOCAuth;