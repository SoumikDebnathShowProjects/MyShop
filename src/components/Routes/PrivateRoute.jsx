import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.jsx";
const PrivateRoute = () => {
const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth", {
          headers: {
            Authorization: auth?.token,
          },
        });
        setOk(res.data.ok);
      } catch (error) {
        console.error("Auth check failed", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return (ok ? <Outlet/> : <Spinner/>);
}

export default PrivateRoute
