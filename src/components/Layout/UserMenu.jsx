import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserEdit, FaHistory, FaChevronRight } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div className="backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10 shadow-lg">
      <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4 pb-2 border-b border-white/10">
        User Dashboard
      </h3>
      
      <nav className="space-y-2">
        <motion.div whileHover={{ x: 5 }}>
          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) => 
              `flex items-center justify-between p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500/30 to-cyan-400/30 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <FaUserEdit className="text-purple-400" />
              <span>Edit Profile</span>
            </div>
            <FaChevronRight className="text-xs opacity-70" />
          </NavLink>
        </motion.div>

        <motion.div whileHover={{ x: 5 }}>
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) => 
              `flex items-center justify-between p-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500/30 to-cyan-400/30 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <FaHistory className="text-cyan-400" />
              <span>Your Orders</span>
            </div>
            <FaChevronRight className="text-xs opacity-70" />
          </NavLink>
        </motion.div>
      </nav>
    </div>
  );
};

export default UserMenu;