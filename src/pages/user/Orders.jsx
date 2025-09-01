import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { motion } from "framer-motion";
import { FaBox, FaCheckCircle, FaTimesCircle, FaClock, FaShoppingBag } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);
 const BASE_URL=import.meta.env.VITE_BASE_URL;
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <FaCheckCircle className="text-green-400" />;
      case 'failed':
        return <FaTimesCircle className="text-red-400" />;
      default:
        return <FaClock className="text-yellow-400" />;
    }
  };

  return (
    <Layout title={"Your Orders"}>
      <div className="min-h-[calc(100vh-136px)] py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6 container mx-auto">
          <div className="w-full md:w-1/4">
            <UserMenu />
          </div>
          
          <div className="w-full md:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 shadow-lg overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                  <FaShoppingBag className="text-purple-400" />
                  Your Order History
                </h1>
              </div>

              {loading ? (
                <div className="p-6 flex justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="p-6 text-center text-white/70">
                  You haven't placed any orders yet.
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {orders?.map((order, index) => (
                    <motion.div 
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6"
                    >
                      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-white/70">Order #</div>
                          <div className="text-white">#{index + 1}</div>
                        </div>
                        <div>
                          <div className="text-white/70">Status</div>
                          <div className="flex items-center gap-2 text-white">
                            {getStatusIcon(order?.status)}
                            {order?.status}
                          </div>
                        </div>
                        <div>
                          <div className="text-white/70">Date</div>
                          <div className="text-white">{moment(order?.createAt).format("MMM Do YYYY")}</div>
                        </div>
                        <div>
                          <div className="text-white/70">Payment</div>
                          <div className="text-white">
                            {order?.payment?.success ? (
                              <span className="text-green-400">Success</span>
                            ) : (
                              <span className="text-red-400">Failed</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {order?.products?.map((product) => (
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            key={product._id}
                            className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4"
                          >
                            <div className="w-full md:w-1/4 flex justify-center">
                              <img
                                src={`${BASE_URL}/product/product-photo/${product._id}`}
                                className="h-32 w-32 object-contain rounded-lg"
                                alt={product.name}
                              />
                            </div>
                            <div className="w-full md:w-3/4">
                              <h3 className="text-lg font-medium text-white">{product.name}</h3>
                              <p className="text-white/70 mt-1 line-clamp-2">{product.description}</p>
                              <div className="mt-3 flex justify-between items-center">
                                <span className="text-purple-400 font-medium">${product.price}</span>
                                <span className="text-white/70 text-sm">Qty: 1</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;