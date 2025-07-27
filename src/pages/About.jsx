import React from "react";
import Layout from "../components/Layout/Layout";
import { motion } from "framer-motion";
import { FaLaptopCode, FaRocket, FaLightbulb, FaUserAstronaut } from "react-icons/fa";

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

  const featureCards = [
    {
      icon: <FaLaptopCode className="text-4xl mb-4 text-purple-400" />,
      title: "Tech Expertise",
      description: "Deep knowledge in cutting-edge technologies and gadget trends"
    },
    {
      icon: <FaRocket className="text-4xl mb-4 text-cyan-400" />,
      title: "Fast Delivery",
      description: "Lightning-fast shipping to get your gadgets to you ASAP"
    },
    {
      icon: <FaLightbulb className="text-4xl mb-4 text-purple-400" />,
      title: "Innovative Solutions",
      description: "Curating the most innovative tech products on the market"
    },
    {
      icon: <FaUserAstronaut className="text-4xl mb-4 text-cyan-400" />,
      title: "Personal Touch",
      description: "Hand-selected products with personal recommendations"
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
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-6"
            >
              About GadgetGalaxy
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-white/80 max-w-3xl mx-auto"
            >
              Where technology meets passion and innovation
            </motion.p>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
            {/* <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm">
                <img
                  src="/images/allround.jpg"
                  alt="Akash Ghosh"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div> */}

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Greetings, fellow tech adventurers!
                </span>
              </h2>
              <p className="text-white">
                I'm Akash Ghosh, the solo virtuoso steering the ship at GadgetGalaxy. Armed with nothing but my trusty keyboard and an insatiable thirst for innovation, I've embarked on a solo odyssey to curate the finest array of tech marvels.
              </p>
              <p className="text-white">
                From conquering coding challenges to navigating the ever-changing seas of software development, I've honed my craft as a lone wolf developer. But fear not, for behind this solitary facade lies a powerhouse of creativity and ingenuity, ready to push the boundaries of what's possible in the digital realm.
              </p>
              <div className="pt-4">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Explore Our Story
                </button>
              </div>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">GadgetGalaxy</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCards.map((card, index) => (
  <motion.div
    key={index}
    whileHover={{ 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(126, 34, 206, 0.3), 0 10px 10px -5px rgba(126, 34, 206, 0.1)"
    }}
    className="relative bg-gradient-to-br from-slate-800/90 to-purple-900/90 rounded-2xl p-6 border border-purple-500/20 hover:border-cyan-400/40 transition-all duration-300 overflow-hidden group"
  >
    {/* Animated background element */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    <div className="relative z-10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 mx-auto bg-gradient-to-br from-cyan-400/20 to-purple-500/20 rounded-xl border border-white/10 group-hover:bg-gradient-to-br group-hover:from-cyan-400/30 group-hover:to-purple-500/30 transition-all duration-300">
        {card.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
        {card.title}
      </h3>
      <p className="text-white/80 font-medium leading-relaxed">
        {card.description}
      </p>
    </div>
  </motion.div>
))}
            </div>
          </motion.div>

          {/* Mission Statement */}
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="mt-24 bg-gradient-to-r from-slate-900/80 to-purple-900/80 rounded-3xl p-8 md:p-12 border border-white/20 backdrop-blur-lg shadow-2xl shadow-purple-900/30"
>
  <h2 className="text-3xl font-bold text-white mb-6 text-center">
    Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Mission</span>
  </h2>
  <p className="text-white/80 text-center max-w-4xl mx-auto leading-relaxed">
    At GadgetGalaxy, we're on a mission to revolutionize your tech experience by bringing you the most innovative, high-quality gadgets curated with passion and expertise. We believe technology should be accessible, exciting, and transformative - and we're here to guide you through the ever-evolving digital universe.
  </p>
</motion.div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default About;