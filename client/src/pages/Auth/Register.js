import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";









const Register = () => {

    // creating variablee bcoz they are hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAdress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // avoid refresh of page on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //testing only
    // console.log(name,email,password,phone,address);
    // toast.success('registered suceessfully')  // sends floating notification

    try {
      const res = await axios.post(
        "/api/v1/auth/register",
        { name, 
          email, 
          password, 
          phone, 
          address,
          answer
         }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login")
      }
      else{
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong Register js");
    }
  };

  return (
    <>
      <Layout>
        <form className="Register" onSubmit={handleSubmit}>
          <h1>Get on Board</h1>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAdress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Address"
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
              placeholder="Your BestFriend Name ?"
              required
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary py-2 px-4"
              onClick={() => {
                navigate("/login");
              }}
            >
              Already have an Account? Sign In instead
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default Register;
