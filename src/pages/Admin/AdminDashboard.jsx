import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../recoil/authAtoms";
import { useNavigate } from "react-router-dom";
 // we will create this atom

const AdminDashboard = () => {
  const auth = useRecoilValue(authAtom);
  const [isAdmin, setIsAdmin] = useState(false); // correct useState names
  const navigate = useNavigate(); 
  const [getData,setData]=useState({});
    useEffect(() => {
    // Check if user is admin
    
    const data = localStorage.getItem('auth');
    
    if(data){
      const parseData = JSON.parse(data);
      console.log(parseData);
      
      if (parseData.user.role===1) {
        setData(parseData.user)
      setIsAdmin(true);
    } else {
      navigate("/"); // Redirect to homepage
    }      

    }
    
  
  }, []);


 
  return (
   isAdmin? 
<div className="p-4">
  <div className="max-w-6xl mx-auto">
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
        Admin Name: <span className="font-normal">{getData.name}</span>
      </h4>
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
        Admin Email: <span className="font-normal">{getData.email}</span>
      </h4>r?.
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
        Admin Contact: <span className="font-normal">{getData.phone}</span>
      </h4>
    </div>
  </div>
</div>

   : <div>user is not Admin</div>
  );
};

export default AdminDashboard;
