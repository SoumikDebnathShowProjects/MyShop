import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal, Table, Button, Badge } from "antd";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/v1/category/create-category", { name });
      if (data?.success) {
        toast.success(`${name} category created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} category updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const answer = window.prompt("Type 'YES' to confirm deletion");
      if (answer && answer.toUpperCase() === "YES") {
        setLoading(true);
        const { data } = await axios.delete(
          `http://localhost:8080/api/v1/category/delete-category/${pId}`
        );
        if (data.success) {
          toast.success("Category deleted successfully");
          getAllCategory();
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error("Deletion cancelled");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button
            icon={<FaEdit />}
            onClick={() => {
              setVisible(true);
              setUpdatedName(record.name);
              setSelected(record);
            }}
            className="flex items-center"
          >
            Edit
          </Button>
          <Button
            icon={<FaTrash />}
            danger
            onClick={() => handleDelete(record._id)}
            className="flex items-center"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout title={"Dashboard - Category Management"}>
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
                Category Management
              </h1>

              {/* Category Form */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <h2 className="text-lg font-semibold text-white mb-4">
                  {selected ? "Update Category" : "Create New Category"}
                </h2>
                <CategoryForm
                  handleSubmit={selected ? handleUpdate : handleSubmit}
                  value={selected ? updatedName : name}
                  setValue={selected ? setUpdatedName : setName}
                  loading={loading}
                />
              </motion.div>

              {/* Categories Table */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-white mb-4">
                  Existing Categories
                </h2>
                <Table
                  columns={columns}
                  dataSource={categories}
                  rowKey="_id"
                  loading={loading}
                  className="bg-transparent"
                  pagination={{ pageSize: 5 }}
                  locale={{
                    emptyText: (
                      <div className="text-center py-8 text-white/70">
                        No categories found
                      </div>
                    )
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Update Modal */}
        <Modal
          title={<span className="text-white">Update Category</span>}
          open={visible}
          onCancel={() => {
            setVisible(false);
            setSelected(null);
            setUpdatedName("");
          }}
          footer={null}
          className="[&_.ant-modal-content]:bg-slate-800 [&_.ant-modal-content]:border [&_.ant-modal-content]:border-white/10"
        >
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
            loading={loading}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;