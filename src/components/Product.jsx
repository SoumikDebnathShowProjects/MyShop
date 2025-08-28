import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Product = ({ post }) => {
  const [cart, setCart] = useCart();
 const BASE_URL=import.meta.env.VITE_BASE_URL;
  const [isSaved, setIsSaved] = useState(() => {
    // Initialize from localStorage if available
    const saved = JSON.parse(localStorage.getItem("saved")) || [];
    return saved.includes(post._id);
  });
  useEffect(()=>{


  },[isSaved])

  const inCart = useMemo(() => cart.some((p) => p._id === post._id), [cart, post._id]);

  // Update localStorage when isSaved changes
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("saved")) || [];
    const updated = isSaved
      ? [...saved, post._id]
      : saved.filter((id) => id !== post._id);
    localStorage.setItem("saved", JSON.stringify(updated));
  }, [isSaved, post._id]);

  const addToCart = (product) => {
    const updated = [...cart, product];
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Item added to cart");
  };

  const removeFromCart = (productId) => {
    const updated = cart.filter((item) => item._id !== productId);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.error("Item removed from cart");
  };

  const toggleSaved = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Removed from saved items" : "Added to saved items");
  };

  return (
    <div className="relative flex flex-col items-center justify-between hover:scale-110 transition-transform duration-300 ease-in gap-3 p-4 mt-10 ml-5 rounded-xl outline bg-white shadow-md max-w-xs">
      <button
        onClick={toggleSaved}
        className="absolute top-4 right-4 hover:text-red-500 transition-colors"
      >
        {isSaved ? (
          <FaHeart className="text-xl text-red-500" />
        ) : (
          <FaRegHeart className="text-xl" />
        )}
      </button>

      <Link to={`/product/${post.slug || post._id}`} className="w-full">
        <div className="w-full">
          <p className="text-gray-700 font-semibold text-lg text-left truncate w-40 mt-1">
            {post.name}
          </p>
        </div>
       
        <div className="w-full">
          <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
            {post.description}
          </p>
        </div>
        <div className="h-[180px] w-full flex items-center justify-center">
          <img
            src={`${BASE_URL}/product/product-photo/${post._id}`} // Use relative path
            alt={post.name}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex justify-between gap-12 items-center w-full mt-5">
        <div>
          <p className="text-green-600 font-semibold">${post.price}</p>
        </div>
        <div>
          {inCart ? (
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in"
              onClick={() => removeFromCart(post._id)}
            >
              Remove Item
            </button>
          ) : (
            <button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition-colors duration-300 ease-in"
              onClick={() => addToCart(post)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;