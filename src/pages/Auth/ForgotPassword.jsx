import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowRight, FaKey } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // step 1 = send OTP, step 2 = reset password
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL=import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     
      const res = await axios.post(
        `${BASE_URL}/auth/sendotp`,
        { email: formData.email }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setStep(2); 
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/resetpassword`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-[calc(100vh-136px)] justify-center py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md mx-auto space-y-8 backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Reset Password
            </h2>
            <p className="mt-2 text-sm text-white/80">
              {step === 1
                ? "Enter your email to receive an OTP"
                : "Enter the OTP and new password"}
            </p>
          </div>

          {/* Step 1: Email input */}
          {step === 1 && (
            <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Email Address"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending..." : "Send OTP"}
              </motion.button>
            </form>
          )}

          {/* Step 2: OTP + New Password */}
          {step === 2 && (
            <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaKey className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    name="otp"
                    type="text"
                    required
                    value={formData.otp}
                    onChange={handleChange}
                    className="pl-10 w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter OTP"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    name="newPassword"
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="pl-10 w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="New Password"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                className={`w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Resetting..." : (
                  <>
                    <span>Reset Password</span>
                    <FaArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>
          )}

          <div className="text-center">
            <p className="text-sm text-white/70">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
