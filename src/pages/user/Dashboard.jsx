import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="min-h-[calc(100vh-136px)] py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6 container mx-auto">
          {/* Sidebar Menu */}
          <div className="w-full md:w-1/4">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
                User Dashboard
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                    {auth?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{auth?.user?.name}</h3>
                    <p className="text-white/70">{auth?.user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-sm font-medium text-white/70 mb-1">Email</h4>
                    <p className="text-white">{auth?.user?.email}</p>
                  </div>

                  <div className="backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-sm font-medium text-white/70 mb-1">Address</h4>
                    <p className="text-white">
                      {auth?.user?.address || "No address provided"}
                    </p>
                  </div>
                </div>

                {auth?.user?.role === 1 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-cyan-400/10 rounded-xl border border-cyan-400/20">
                    <p className="text-sm text-white/80 italic">
                      You have administrator privileges. Additional options are available in the admin dashboard.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;