import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load product data");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Type YES to confirm product deletion");
      if (answer && answer.toUpperCase() === "YES") {
        await axios.delete(`/api/v1/product/delete-product/${id}`);
        toast.success("Product Deleted Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Deletion cancelled");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col min-h-[calc(100vh-136px)] py-8">
        <div className="flex flex-col md:flex-row gap-6 container mx-auto px-4">
          <div className="w-full md:w-1/5">
            <AdminMenu />
          </div>
          
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
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Category
                    </label>
                    <Select
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="w-full"
                      onChange={(value) => setCategory(value)}
                      value={category}
                      dropdownClassName="bg-gray-800 border border-white/10 text-white"
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id} className="hover:bg-gray-700">
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  {/* Shipping */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Shipping
                    </label>
                    <Select
                      placeholder="Select Shipping"
                      size="large"
                      className="w-full"
                      onChange={(value) => setShipping(value)}
                      value={shipping ? "1" : "0"}
                      dropdownClassName="bg-gray-800 border border-white/10 text-white"
                    >
                      <Option value="0" className="hover:bg-gray-700">No</Option>
                      <Option value="1" className="hover:bg-gray-700">Yes</Option>
                    </Select>
                  </div>
                </div>

                {/* Photo Upload */}
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
                      onChange={(e) => setPhoto(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                  
                  {/* Photo Preview */}
                  <div className="flex justify-center">
                    {photo ? (
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        className="h-48 w-48 object-contain rounded-lg border border-white/10"
                      />
                    ) : (
                      <img
                        src={`/api/v1/product/product-photo/${id}`}
                        alt="product_photo"
                        className="h-48 w-48 object-contain rounded-lg border border-white/10"
                      />
                    )}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      placeholder="Enter product name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      placeholder="Enter product description"
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-white/80 mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      placeholder="Enter price"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-white/80 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      placeholder="Enter quantity"
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
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
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg shadow-sm text-white bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500"
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
    </Layout>
  );
};

export default UpdateProduct;