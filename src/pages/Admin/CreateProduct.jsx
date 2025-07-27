import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select, Button, Upload, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaUpload, 
  FaBoxOpen, 
  FaDollarSign, 
  FaHashtag,
  FaTruck,
  FaCheckCircle
} from "react-icons/fa";

const { Option } = Select;
const { TextArea } = Input;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle form input changes
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          productData.append(key, value);
        }
      });

      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/10 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Admin Menu Sidebar */}
          <div className="lg:col-span-1">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent mb-6">
                Create New Product
              </h1>

              <form onSubmit={handleCreate} className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-white/80 mb-2">Category</label>
                  <Select
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="w-full"
                    onChange={(value) => handleChange("category", value)}
                    value={formData.category}
                    dropdownStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        <div className="flex items-center">
                          <FaBoxOpen className="mr-2" />
                          {c.name}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-white/80 mb-2">Product Image</label>
                  <div className="flex flex-col items-center space-y-4">
                    <label className="w-full">
                      <div className="flex items-center justify-center px-4 py-6 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
                        <div className="text-center">
                          <FaUpload className="mx-auto text-2xl text-purple-400 mb-2" />
                          <p className="text-white/80">
                            {formData.photo ? formData.photo.name : "Click to upload product image"}
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </div>
                    </label>
                    {preview && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2"
                      >
                        <img
                          src={preview}
                          alt="product preview"
                          className="h-48 object-contain rounded-lg border border-white/10"
                        />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-white/80 mb-2">Product Name</label>
                  <Input
                    size="large"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-white/80 mb-2">Description</label>
                  <TextArea
                    rows={4}
                    placeholder="Enter product description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                {/* Price and Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/80 mb-2">Price</label>
                    <InputNumber
                      addonBefore={<FaDollarSign className="text-white/70" />}
                      size="large"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={(value) => handleChange("price", value)}
                      className="w-full bg-white/5 border-white/10"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2">Quantity</label>
                    <InputNumber
                      addonBefore={<FaHashtag className="text-white/70" />}
                      size="large"
                      placeholder="Enter quantity"
                      value={formData.quantity}
                      onChange={(value) => handleChange("quantity", value)}
                      className="w-full bg-white/5 border-white/10"
                      min={0}
                    />
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <label className="block text-white/80 mb-2">Shipping</label>
                  <Select
                    size="large"
                    placeholder="Select shipping option"
                    value={formData.shipping}
                    onChange={(value) => handleChange("shipping", value)}
                    className="w-full bg-white/5 border-white/10"
                    dropdownStyle={{
                      backgroundColor: '#1e293b',
                      borderColor: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <Option value="0">
                      <div className="flex items-center">
                        <FaTruck className="mr-2" />
                        No Shipping
                      </div>
                    </Option>
                    <Option value="1">
                      <div className="flex items-center">
                        <FaTruck className="mr-2" />
                        Requires Shipping
                      </div>
                    </Option>
                  </Select>
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    loading={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 border-none"
                    icon={<FaCheckCircle />}
                  >
                    {loading ? "Creating..." : "Create Product"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;