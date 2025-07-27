import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer" style={{ backgroundColor: "black", color: "white" }}>
      <h1 className="text-center"> &copy;<h1 className="text-center fst-italic">GADGETGALAXY</h1> </h1>
      <p className="text-center mt-3">
        <Link to="/about" style={{ color: "white" }}>About</Link>
        |
        <Link to="/contact" style={{ color: "white" }}>Contact</Link>
        |
        <Link to="/policy" style={{ color: "white" }}>Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
