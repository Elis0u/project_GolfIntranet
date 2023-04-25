import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../store/slices/user";
import { getUserAuth } from "../../services/api.js";

function HOCAuth({ child, auth }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  const Child = child;

  useEffect(() => {
    setIsMounted(true);

    async function checkAuth() {
      if (auth) {
        const TOKEN = localStorage.getItem("auth");
        let res = null;
        if (TOKEN) {
          try {
            res = await getUserAuth("/user/checkToken", TOKEN);
          } catch (err) {
            if (err.response && err.response.status === 401) {
              res = { status: 401 };
            }
          }
        }
        if ((!res || res.status === 401 || !TOKEN) && isMounted) {
          dispatch(signOut());
          localStorage.removeItem("auth");
          localStorage.removeItem("user");
          navigate("/entry");
        }
      }
    }

    if (auth !== undefined && isMounted) {
      checkAuth();
    }

    return () => {
      setIsMounted(false);
    };
  }, [auth, dispatch, navigate, isMounted]);

  const renderChild = () => {
    if (auth === undefined) {
      return <Child />;
    } else if (auth === true) {
      const TOKEN = localStorage.getItem("auth");
      if (TOKEN) {
        return <Child />;
      }
    } else {
      return null;
    }
  };

  return renderChild();
}

export default HOCAuth;