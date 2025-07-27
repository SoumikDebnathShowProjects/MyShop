import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBoxOpen, FaSearch, FaEdit } from "react-icons/fa";
import Loading from "../../components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title={"Admin - Products Management"}>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Admin Menu Sidebar */}
          <div className="lg:col-span-1">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
                Products Management
              </h1>
              <p className="text-white/80">
                View and manage all products in your store
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-white/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>

            {loading ? (
              <Loading />
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white/5 rounded-xl"
              >
                <FaBoxOpen className="mx-auto text-5xl text-white/30 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchTerm ? "No matching products found" : "No products available"}
                </h3>
                {!searchTerm && (
                  <Link
                    to="/dashboard/admin/create-product"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Create your first product
                  </Link>
                )}
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-purple-400/30 transition-all duration-300"
                  >
                    <Link
                      to={`/dashboard/admin/product/${product.slug}`}
                      className="block h-full"
                    >
                      {/* Product Image */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          alt={product.name}
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2">
                          <FaEdit className="text-white" />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {product.name}
                        </h3>
                        <p className="text-white/70 text-sm mt-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-purple-400 font-bold">
                            ${product.price}
                          </span>
                          <span className="text-xs text-white/50">
                            {product.quantity} in stock
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;