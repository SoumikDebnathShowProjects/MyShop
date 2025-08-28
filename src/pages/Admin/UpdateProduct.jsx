import React, { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaTrash } from "react-icons/fa";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "0",
    stock: 0,
  });
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState("");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Memoized fetch functions
  const getSingleProduct = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/product/get-product/${params.slug}`
      );
      const product = data.product;
      setId(product._id);
      setProductData({
        name: product.name || "",
        description: product.description || "",
        price: product.price ?? "",
        quantity: product.quantity ?? "",
        shipping: product.shipping ? "1" : "0",
        category: product.category?._id || "",
        stock: product.stock ?? 0,
      });
      setPhotoPreview(
        product.photo ? `${BASE_URL}/product/product-photo/${product._id}` : ""
      );
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product data");
    }
  }, [BASE_URL, params.slug]);

  const getAllCategory = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  }, [BASE_URL]);

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
  }, [getSingleProduct, getAllCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("quantity", productData.quantity);
      if (photo) formData.append("photo", photo);
      formData.append("category", productData.category);
      formData.append("stock", productData.stock);
      formData.append("shipping", productData.shipping);

      const { data } = await axios.put(
        `${BASE_URL}/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      const answer = window.prompt("Type YES to confirm product deletion");
      if (answer?.toUpperCase() === "YES") {
        await axios.delete(`${BASE_URL}/product/delete-product/${id}`);
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Deletion cancelled");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-136px)] py-8">
      <div className="flex flex-col md:flex-row gap-6 container mx-auto px-4">
        <div className="w-full md:w-4/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Update Product
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Modify your product details
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Select */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Category
                  </label>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="w-full"
                    onChange={(value) => handleSelectChange("category", value)}
                    value={productData.category || undefined}
                    classNames={{
                      popup: "bg-gray-800 border border-white/10 text-white",
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Shipping Select */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Shipping
                  </label>
                  <Select
                    placeholder="Select Shipping"
                    size="large"
                    className="w-full"
                    onChange={(value) => handleSelectChange("shipping", value)}
                    value={productData.shipping || undefined}
                    classNames={{
                      popup: "bg-gray-800 border border-white/10 text-white",
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
              </div>

              {/* Upload Photo */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80">
                  Product Photo
                </label>
                <label className="flex items-center justify-center px-4 py-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="text-white/80">
                    {photo ? photo.name : "Click to upload new photo"}
                  </span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
                {photoPreview && (
                  <div className="flex justify-center">
                    <img
                      src={photoPreview}
                      alt="product preview"
                      className="h-48 w-48 object-contain rounded-lg border border-white/10"
                    />
                  </div>
                )}
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={productData.name}
                    placeholder="Enter product name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={productData.description}
                    placeholder="Enter product description"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={productData.quantity}
                    placeholder="Enter quantity"
                    min="0"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    placeholder="Enter stock"
                    min="0"
                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white bg-gradient-to-r from-purple-600 to-cyan-500 ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Updating..." : (
                    <>
                      <span>Update Product</span>
                      <FaArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-white bg-gradient-to-r from-red-600 to-pink-500"
                >
                  <span>Delete Product</span>
                  <FaTrash className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;