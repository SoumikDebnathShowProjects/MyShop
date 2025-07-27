import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";


const Login = () => {
  // creating variablee bcoz they are hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // avoid refresh of page on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //testing only
    // console.log(name,email,password,phone,address);
    // toast.success('registered suceessfully')  // sends floating notification

    // API-----------------------------------------------
    try {
      const res = await axios.post(
        "/api/v1/auth/login",
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        // saving info to local storage before navigation
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/"); // direct to login page or go to user left page
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong login js");
    }
  };
  return (
    <>
      <Layout>
        <form className="login" onSubmit={handleSubmit}>
          <h1>Hello there, welcome back</h1>

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary mb-3">
            Sign In
          </button>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot password?
            </button>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/register");
              }}
            >
            New here? Sign Up instead
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Login;
