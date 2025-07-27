import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
  // creating variablee bcoz they are hook

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  // const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
 // const location = useLocation();
  // avoid refresh of page on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API-----------------------------------------------
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong Register js");
    }
  };
  return (
    <Layout>
      <form className="ForgotPassword" onSubmit={handleSubmit}>
        <h1>Forgot Page!</h1>

        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="exampleInputEmail"
            placeholder="Enter Email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            id="exampleInputAnswer"
            placeholder="Enter best friend name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword"
            placeholder="Enter New Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mb-3">
          Reset
        </button>
      </form>
    </Layout>
  );
};

export default ForgotPassword;




















