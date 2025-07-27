import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select, Badge } from "antd";
import { motion } from "framer-motion";
import { FaBoxOpen, FaShippingFast, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled"
  ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const statusColors = {
    "Not Process": "orange",
    "Processing": "blue",
    "Shipped": "geekblue",
    "Delivered": "green",
    "Canceled": "red"
  };

  const statusIcons = {
    "Not Process": <FaBoxOpen className="mr-1" />,
    "Processing": <FaShippingFast className="mr-1" />,
    "Delivered": <FaCheckCircle className="mr-1" />,
    "Canceled": <FaTimesCircle className="mr-1" />
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      toast.success(`Order status updated to ${value}`);
      getOrders();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <Layout title={"Admin Orders Dashboard"}>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Admin Menu Sidebar */}
          <div className="lg:col-span-1">
            <AdminMenu />
          </div>

          {/* Orders Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
                Orders Management
              </h1>
              <p className="text-white/80">
                View and manage all customer orders
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : orders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white/5 rounded-xl"
              >
                <FaBoxOpen className="mx-auto text-5xl text-white/30 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Orders Found
                </h3>
                <p className="text-white/70">
                  There are currently no orders to display
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-4 border-b border-white/10">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="text-lg font-semibold text-white">
                            Order #{index + 1}
                          </h3>
                          <div className="flex items-center mt-1">
                            <Badge
                              color={statusColors[order.status]}
                              text={
                                <span className="text-white/90">
                                  {statusIcons[order.status]} {order.status}
                                </span>
                              }
                            />
                          </div>
                        </div>
                        <div className="text-sm text-white/70">
                          <div>
                            <span className="font-medium">Placed:</span>{" "}
                            {moment(order.createAt).format("MMM Do YYYY, h:mm a")}
                          </div>
                          <div>
                            <span className="font-medium">Customer:</span>{" "}
                            {order.buyer?.name}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white/5 p-3 rounded-lg">
                          <h4 className="text-sm font-medium text-white/70 mb-1">
                            Payment Status
                          </h4>
                          <p className="text-white">
                            {order.payment?.success ? (
                              <span className="text-green-400">Success</span>
                            ) : (
                              <span className="text-red-400">Failed</span>
                            )}
                          </p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <h4 className="text-sm font-medium text-white/70 mb-1">
                            Items
                          </h4>
                          <p className="text-white">{order.products?.length}</p>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg">
                          <h4 className="text-sm font-medium text-white/70 mb-1">
                            Update Status
                          </h4>
                          <Select
                            className="w-full"
                            onChange={(value) => handleChange(order._id, value)}
                            value={order.status}
                            dropdownStyle={{
                              backgroundColor: '#1e293b',
                              borderColor: 'rgba(255,255,255,0.1)'
                            }}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                <div className="flex items-center">
                                  <span className={`inline-block w-2 h-2 rounded-full mr-2 bg-${statusColors[s]}-500`}></span>
                                  {s}
                                </div>
                              </Option>
                            ))}
                          </Select>
                        </div>
                      </div>

                      {/* Products List */}
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Products
                      </h4>
                      <div className="space-y-3">
                        {order.products?.map((product) => (
                          <motion.div
                            key={product._id}
                            whileHover={{ scale: 1.01 }}
                            className="flex flex-col sm:flex-row bg-white/5 rounded-lg overflow-hidden border border-white/10"
                          >
                            <div className="sm:w-1/4">
                              <img
                                src={`/api/v1/product/product-photo/${product._id}`}
                                className="w-full h-32 object-cover"
                                alt={product.name}
                                loading="lazy"
                              />
                            </div>
                            <div className="p-4 sm:w-3/4">
                              <h5 className="text-lg font-medium text-white">
                                {product.name}
                              </h5>
                              <p className="text-white/70 text-sm line-clamp-2">
                                {product.description}
                              </p>
                              <p className="text-purple-400 font-semibold mt-2">
                                ${product.price}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
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

export default AdminOrders;