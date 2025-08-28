import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Product from "../components/Product";
import HeroSlider from "../components/HeroSlider";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const HomePage = () => {
  const navigate = useNavigate();
  const [cart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategory = async (category) => {
    try {
      setLoading(true);
      if (selectedCategory === category.slug) {
        setSelectedCategory(null);
        setCurrentCategory(null);
        setCategoryProducts([]);
        getAllProducts();
      } else {
        setSelectedCategory(category.slug);
        setCurrentCategory(category);
        const { data } = await axios.get(
          `${API_BASE_URL}/product/product-category/${category.slug}`
        );
        setCategoryProducts(data?.products || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading category products");
    } finally {
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/category/get-category`);
      if (data?.success) setCategories(data?.category.slice(0, 6) || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/product/product-list/1`);
      setProducts(data?.products.slice(0, 8) || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllProducts();
  }, []);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Summer Collection 2023",
      subtitle: "Discover our latest arrivals"
    },
    {
      image: "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Limited Time Offer",
      subtitle: "Up to 50% off selected items"
    }
  ];

  return (
    <Layout title={"Premium Products - Shop the Best"}>
      <HeroSlider
        slides={slides}
        height="70vh"
        overlayOpacity={0.3}
        textPosition="center"
        buttonIcon={<FiArrowRight />}
        onButtonClick={() => navigate('/products')}
      />

      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <motion.div 
              key={category._id}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all cursor-pointer ${
                selectedCategory === category.slug ? 'border-blue-500 border-2' : ''
              }`}
              onClick={() => handleCategory(category)}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center text-gray-900">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
          {/* Add this button container after the categories grid */}
  
    <div className="flex justify-center mt-8">
      <button
        onClick={() => {
          setSelectedCategory(null);
          setCurrentCategory(null);
          setCategoryProducts([]);
          getAllProducts();
        }}
        className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all"
      >
        Show All Products
      </button>
    </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {selectedCategory ? (
            <>
              <h2 className="text-3xl font-bold mb-8 text-center">
                Category - {currentCategory?.name}
              </h2>
              <h6 className="text-center mb-8">
                {categoryProducts.length} products found
              </h6>
            </>
          ) : (
            <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              <div className="col-span-4 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : selectedCategory ? (
              categoryProducts.map((p) => (
                <Product key={p._id} post={p} />
              ))
            ) : (
              products.map((p) => (
                <Product key={p._id} post={p} />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;