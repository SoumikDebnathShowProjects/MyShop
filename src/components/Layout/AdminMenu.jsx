import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaLayerGroup, 
  FaPlusCircle, 
  FaBoxes, 
  FaClipboardList,
  FaUsersCog
} from "react-icons/fa";
import { motion } from "framer-motion";

const AdminMenu = () => {
  const menuItems = [
    {
      path: "/dashboard/admin/create-category",
      name: "Manage Categories",
      icon: <FaLayerGroup className="mr-3" size={18} />
    },
    {
      path: "/dashboard/admin/create-product",
      name: "Create Product",
      icon: <FaPlusCircle className="mr-3" size={18} />
    },
    {
      path: "/dashboard/admin/products",
      name: "Manage Products",
      icon: <FaBoxes className="mr-3" size={18} />
    },
    {
      path: "/dashboard/admin/orders",
      name: "Manage Orders",
      icon: <FaClipboardList className="mr-3" size={18} />
    },
    // Uncomment when needed:
    // {
    //   path: "/dashboard/admin/users",
    //   name: "Manage Users",
    //   icon: <FaUsersCog className="mr-3" size={18} />
    // }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-5 border border-white/10 shadow-lg">
      <motion.h3 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-white mb-6 pb-3 border-b border-white/10 flex items-center justify-center"
      >
        <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Admin Dashboard
        </span>
      </motion.h3>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) => 
                `flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/30 text-white shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <span className="text-purple-400">
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

export default AdminMenu;