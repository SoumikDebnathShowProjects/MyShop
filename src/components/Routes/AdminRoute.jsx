import React from 'react'
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom"; // will help on routing
import axios from "axios";
import Spinner from "../Spinner";
const AdminRoute = () => {
 const [ok, setOk] = useState(false);
    const [auth,setAuth] = useAuth();
  const BASE_URL=import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const authCheck = async() => {
            try{
           const res = await axios.get(`${BASE_URL}/auth/admin-auth`);
           
          if(res.data.ok){
            setOk(true);
          }else{
            setOk(false);
          }
        }catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 error here, e.g., redirect to an unauthorized page or show a message.
                // Set the ok response to false if any error
                setOk(false);
            } else {
                console.error(error);
            }
        }

        };
           
        
     if(auth?.token) authCheck();
      },[auth?.token]);
    return ok ? <Outlet/> :<Spinner path=""/>;
}

export default AdminRoute
