import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-purple-900/10">
      <Header />
      <main className="flex-grow">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;