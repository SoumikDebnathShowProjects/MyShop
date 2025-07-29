import React from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaSearch, FaShoppingCart, FaInfoCircle } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <FaSearch className="text-purple-500 text-2xl" />
            <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          </motion.div>
          
          <p className={`text-lg ${values?.results.length < 1 ? 'text-red-500' : 'text-green-600'}`}>
            {values?.results.length < 1
              ? "No products match your search"
              : `Found ${values?.results.length} ${values?.results.length === 1 ? 'item' : 'items'}`}
          </p>
        </div>

        {values?.results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {values.results.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-lg"
              >
                <div className="p-4 bg-gray-50 flex justify-center items-center h-48">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="h-full w-full object-contain"
                    alt={p.name}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{p.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {p.description}
                  </p>
                  <p className="text-xl font-bold text-purple-600 mt-3">${p.price}</p>

                  <div className="flex justify-between mt-4 space-x-2">
                    <button
                      onClick={() => navigate(`/product/${p.slug}`)}
                      className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-md transition-colors"
                    >
                      <FaInfoCircle className="text-gray-600" />
                      Details
                    </button>
                    
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success(`${p.name} added to cart`);
                      }}
                      className="flex items-center gap-1 text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;