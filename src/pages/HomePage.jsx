import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { FaSearch, FaShoppingCart, FaInfoCircle } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noProductsAvailable, setNoProductsAvailable] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/category/get-category`);
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
        checked,
        radio,
      });
      if (data?.products?.length > 0) {
        setProducts(data.products);
        setNoProductsAvailable(false);
      } else {
        setNoProductsAvailable(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  // Infinite scroll
  const handleInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 5 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  // Initial data fetch
  useEffect(() => {
    getAllCategory();
    getTotal();
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  // Load more when page changes
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Filter products when filters change
  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
    else filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"All Products - Best offers"}>
      {/* Hero Carousel */}
      {/* <div className="relative overflow-hidden rounded-xl shadow-2xl mb-8">
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            {[
              "https://www.techadvisor.com/wp-content/uploads/2022/06/google_pixel_6_6_pro_collage_official_press_image.jpg?quality=50&strip=all",
              "https://9to5mac.com/wp-content/uploads/sites/6/2023/01/m2-macbook-pros-rumor.jpg?quality=82&strip=all&w=1024",
              "https://i.ytimg.com/vi/dJCA_RxBXuA/maxresdefault.jpg"
            ].map((src, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img
                  src={src}
                  className="w-full h-64 md:h-96 object-cover"
                  alt={`banner${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/5 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-4">Filters</h4>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-white/80 mb-3">Categories</h5>
              <div className="space-y-2">
                {categories?.map((c) => (
                  <div key={c._id} className="flex items-center">
                    <Checkbox
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                      className="text-white"
                    >
                      <span className="text-white/80">{c.name}</span>
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold text-white/80 mb-3">Price Range</h5>
              <Radio.Group onChange={(e) => setRadio(e.target.value)} className="flex flex-col space-y-2">
                {Prices?.map((p) => (
                  <Radio key={p._id} value={p.array} className="text-white">
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium"
            >
              Reset Filters
            </motion.button>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-4/5">
            <h1 className="text-3xl font-bold text-white mb-6">All Products</h1>
            
            {noProductsAvailable && (
              <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-300 p-4 rounded-lg mb-6">
                No products available under this filter. Try different filters or reset.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products?.map((p) => (
                <motion.div
                  key={p._id}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-400/30 transition-all duration-300"
                >
                  <Link to={`/product/${p.slug}`} className="block">
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                      )}
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        alt={p.name}
                        onLoad={handleImageLoad}
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white truncate">{p.name}</h3>
                      <p className="text-white/70 text-sm mt-1 line-clamp-2">{p.description}</p>
                      <p className="text-xl font-bold text-purple-400 mt-2">${p.price}</p>
                      
                      <div className="flex justify-between mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${p.slug}`);
                          }}
                          className="flex items-center gap-1 text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <FaInfoCircle /> Details
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.preventDefault();
                            setCart([...cart, p]);
                            localStorage.setItem("cart", JSON.stringify([...cart, p]));
                            toast.success(`${p.name} added to cart`);
                          }}
                          className="flex items-center gap-1 text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <FaShoppingCart /> Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {products.length < total && (
              <div className="flex justify-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPage(page + 1)}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && <Loading />}
    </Layout>
  );
};

export default HomePage;