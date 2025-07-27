import React from "react";
import Footer from "./Footer";
import Header from "./Header";

import toast, { Toaster } from 'react-hot-toast';
// import {Helmet} from 'react-helmet'
const Layout = ({ children }) => {
  return (
    <div>
       {/* <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
          </Helmet> */}
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster/>
        {children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
