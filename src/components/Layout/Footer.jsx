import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full backdrop-blur-md bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 border-t border-white/10 shadow-2xl mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                MyShop
              </span>
            </Link>
            <p className="text-white/70 text-sm max-w-xs">
              Your one-stop shop for the daily accessories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:ml-auto lg:ml-0">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/policy" 
                  className="text-white/70 hover:text-white text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
