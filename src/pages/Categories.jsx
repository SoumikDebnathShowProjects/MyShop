import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import { motion } from "framer-motion";

const Categories = () => {
  const categories = useCategory();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <Layout title={"All Categories"}>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-4">
              Explore Categories
            </h1>
            <p className="text-xl text-white/80">
              Browse our wide range of product categories
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {categories.map((c) => (
              <motion.div 
                key={c._id}
                variants={item}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Link 
                  to={`/category/${c.slug}`} 
                  className="block h-full"
                >
                  <div className="h-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/30 transition-all duration-300 group">
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {c.name}
                      </h3>
                      <p className="mt-2 text-white/70">
                        Explore {c.name} products
                      </p>
                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                          View category
                          <svg 
                            className="w-4 h-4 ml-2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;