import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate, Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaTrash, FaArrowRight, FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  // Get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load payment gateway");
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // Handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment completed successfully!");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-2">
              {auth?.token ? `Welcome, ${auth.user.name}` : "Your Shopping Cart"}
            </h1>
            <p className="text-xl text-white/80">
              {cart?.length
                ? `You have ${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`
                : "Your cart is empty"}
            </p>
          </motion.div>

          {cart?.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((p) => (
                  <motion.div
                    key={p._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-1/3">
                        <img
                          src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                          className="w-full h-48 object-cover"
                          alt={p.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 sm:w-2/3 flex flex-col">
                        <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                        <p className="text-white/70 mt-1 line-clamp-2">
                          {p.description}
                        </p>
                        <p className="text-xl font-bold text-purple-400 mt-2">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <div className="mt-auto pt-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeCartItem(p._id)}
                            className="flex items-center gap-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <FaTrash /> Remove
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Checkout Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-4">
                  <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Subtotal</span>
                      <span className="text-white">{totalPrice()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Shipping</span>
                      <span className="text-white">Free</span>
                    </div>
                    <div className="border-t border-white/10 my-4"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 font-semibold">Total</span>
                      <span className="text-xl font-bold text-purple-400">
                        {totalPrice()}
                      </span>
                    </div>

                    {auth?.user?.address ? (
                      <div className="mt-6">
                        <h4 className="text-white/80 mb-2">Delivery Address</h4>
                        <p className="text-white mb-4">{auth.user.address}</p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate("/dashboard/user/profile")}
                          className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium mb-4"
                        >
                          Update Address
                        </motion.button>
                      </div>
                    ) : (
                      <div className="mt-6">
                        {auth?.token ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/dashboard/user/profile")}
                            className="w-full py-2 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-medium mb-4"
                          >
                            Add Delivery Address
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/login", { state: "/cart" })}
                            className="w-full py-2 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-medium mb-4"
                          >
                            Login to Checkout
                          </motion.button>
                        )}
                      </div>
                    )}

                    {/* Payment Gateway */}
                    {clientToken && auth?.user?.address && (
                      <div className="mt-6">
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: { flow: "vault" },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePayment}
                          disabled={loading || !instance}
                          className={`w-full mt-4 py-3 px-4 rounded-lg font-medium ${
                            loading || !instance
                              ? "bg-gray-500/30 cursor-not-allowed"
                              : "bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                          } text-white`}
                        >
                          {loading ? (
                            "Processing..."
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              Complete Payment <FaArrowRight />
                            </span>
                          )}
                        </motion.button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <FaShoppingCart className="mx-auto text-6xl text-white/20 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
                <p className="text-white/70 mb-6">
                  Looks like you haven't added anything to your cart yet
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-medium"
                >
                  Continue Shopping
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;