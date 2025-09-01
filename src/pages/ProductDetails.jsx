import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaRegStar, FaTruck, FaShieldAlt, FaShare, FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const BASE_URL=import.meta.env.VITE_BASE_URL;
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      setIsSaved(data?.product?.save || false);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product, qty = 1) => {
    const itemExists = cart.find(item => item._id === product._id);
    
    if (itemExists) {
      const updatedCart = cart.map(item =>
        item._id === product._id 
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: qty }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const toggleSave = async () => {
    try {
      await axios.put(`${BASE_URL}/product/save-product/${product._id}`, {
        save: !isSaved
      });
      setIsSaved(!isSaved);
      toast.success(!isSaved ? "Saved to your items" : "Removed from saved items");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update saved status");
    }
  };

  const renderRatingStars = (rating = 4) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-gray-300" />
        )
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[calc(100vh-136px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-[calc(100vh-136px)] py-6 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <IoIosArrowForward className="inline mx-1" />
          <Link to={`/category/${product?.category?.slug}`} className="hover:text-blue-600">
            {product?.category?.name}
          </Link>
          <IoIosArrowForward className="inline mx-1" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Product Images */}
            <div className="md:w-2/5 p-6 border-r">
              <div className="sticky top-4">
                <div className="h-96 flex items-center justify-center mb-4">
                  <img
                    src={`${BASE_URL}/product/product-photo/${product._id}`}
                    className="max-h-full max-w-full object-contain"
                    alt={product.name}
                  />
                </div>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 border rounded-md overflow-hidden ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'}`}
                    >
                      <img
                        src={`${BASE_URL}/product/product-photo/${product._id}`}
                        className="w-full h-full object-cover"
                        alt={`${product.name} thumbnail ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-3/5 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <button
                  onClick={toggleSave}
                  className="text-gray-400 hover:text-red-500"
                  aria-label={isSaved ? "Remove from saved items" : "Save for later"}
                >
                  {isSaved ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-xl" />
                  )}
                </button>
              </div>

              <div className="mt-2 flex items-center">
                <div className="flex mr-2">
                  {renderRatingStars()}
                </div>
                <span className="text-blue-600 text-sm font-medium ml-1">123 ratings</span>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="text-green-600 text-sm font-medium ml-2">{product.discount}% off</span>
                )}
              </div>

              <div className="mt-4">
                <span className="text-sm text-gray-600">Inclusive of all taxes</span>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Description</h2>
                <p className="mt-2 text-gray-600">{product.description}</p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Availability</h2>
                <p className={`mt-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </p>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900">Quantity</h2>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border rounded-l-md flex items-center justify-center text-xl"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-16 h-10 border-t border-b flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border rounded-r-md flex items-center justify-center text-xl"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock <= 0}
                  className={`flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 px-6 rounded-md shadow-sm ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    navigate('/cart');
                  }}
                  disabled={product.stock <= 0}
                  className={`flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md shadow-sm ${product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Buy Now
                </button>
              </div>

              <div className="mt-8 border-t pt-6">
                <div className="flex items-center text-green-600 mb-2">
                  <FaTruck className="mr-2" />
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaShieldAlt className="mr-2" />
                  <span>7-day easy returns</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <FaShare className="mr-2" />
                  <span>Share this product</span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="p-6 border-t">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Similar Products</h2>
            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <div key={p._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/product/${p.slug}`} className="block">
                      <div className="p-4 h-48 flex items-center justify-center bg-white">
                        <img
                          src={`${BASE_URL}/product/product-photo/${p._id}`}
                          className="max-h-full max-w-full object-contain"
                          alt={p.name}
                        />
                      </div>
                      <div className="p-4 bg-gray-50">
                        <h3 className="font-medium text-gray-900 truncate">{p.name}</h3>
                        <div className="mt-1 flex items-center">
                          {renderRatingStars()}
                          <span className="text-xs text-gray-500 ml-1">(24)</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-lg font-bold text-gray-900">${p.price}</span>
                          {p.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-1">${p.originalPrice}</span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(p);
                          }}
                          className="mt-3 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 rounded-md text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No similar products found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;