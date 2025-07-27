import React from "react";
import Layout from "./../components/Layout/Layout";
import { motion } from "framer-motion";
import { FaLock, FaShieldAlt, FaUserSecret } from "react-icons/fa";
import policyImage from "../images/policy.png";
const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const privacyPoints = [
    {
      icon: <FaLock className="text-2xl text-purple-400" />,
      text: "No personal data collection"
    },
    {
      icon: <FaShieldAlt className="text-2xl text-cyan-400" />,
      text: "No cookies or tracking"
    },
    {
      icon: <FaUserSecret className="text-2xl text-purple-400" />,
      text: "100% anonymous browsing"
    }
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/20 pt-20 pb-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4"
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-white/80 max-w-3xl mx-auto"
            >
              Your privacy matters to us
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
                <img
                  src={policyImage}
                  alt="Privacy protection"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Our Commitment to Privacy
                </span>
              </h2>
              <p className="text-white/80 leading-relaxed text-lg">
                Please refrain from sharing any private or personal information here. 
                This website is solely for the purpose of a personal project and does 
                not collect or store any personal data.
              </p>
              <p className="text-white/80 leading-relaxed text-lg">
                Thank you for your cooperation in maintaining privacy and confidentiality.
              </p>

              {/* Privacy Points */}
              <div className="space-y-4 pt-4">
                {privacyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <div className="text-2xl">
                      {point.icon}
                    </div>
                    <p className="text-white/80 font-medium">{point.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-slate-900/80 to-purple-900/80 rounded-3xl p-8 md:p-12 border border-white/20 backdrop-blur-lg shadow-2xl shadow-purple-900/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Data Protection Assurance
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80 max-w-4xl mx-auto">
              <p className="leading-relaxed">
                This project was developed with privacy-by-design principles. No analytics, tracking, or user profiling is implemented.
              </p>
              <p className="leading-relaxed">
                All interactions are completely anonymous, and no server logs are maintained that could identify visitors.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default About;