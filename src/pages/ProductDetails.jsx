import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaShoppingCart, FaInfoCircle, FaArrowRight } from "react-icons/fa";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  // Get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item added to cart");
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-136px)] py-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Main Product Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-8 mb-12"
            >
              {/* Product Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    className="rounded-lg w-full max-h-[500px] object-contain"
                    alt={product.name}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2">
                <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                    {product.name}
                  </h1>
                  
                  <div className="space-y-4">
                    <p className="text-white/80">{product.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-white">Price:</span>
                      <span className="text-xl text-purple-400">${product.price}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-white">Category:</span>
                      <span className="text-white/80">{product?.category?.name}</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => addToCart(product)}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 mt-6 rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <FaShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Similar Products Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
                Similar Products
              </h2>
              
              {relatedProducts.length < 1 ? (
                <p className="text-center text-white/70">No similar products found</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {relatedProducts?.map((p) => (
                    <motion.div
                      key={p._id}
                      whileHover={{ y: -5 }}
                      className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-lg overflow-hidden"
                    >
                      <Link to={`/product/${p.slug}`} className="block">
                        <div className="p-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="w-full h-48 object-contain rounded-lg"
                            alt={p.name}
                          />
                        </div>
                        
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {p.name}
                          </h3>
                          <p className="text-white/70 text-sm mt-1 line-clamp-2">
                            {p.description}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-purple-400 font-medium">
                              ${p.price}
                            </span>
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate(`/product/${p.slug}`);
                                }}
                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                                title="Details"
                              >
                                <FaInfoCircle className="text-white" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  addToCart(p);
                                }}
                                className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                                title="Add to Cart"
                              >
                                <FaShoppingCart className="text-white" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;