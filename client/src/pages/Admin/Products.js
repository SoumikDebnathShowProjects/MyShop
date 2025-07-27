
import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";




const Products = () => {
  const [products, setProducts] = useState([]);



  const customStyles = `
  .cardpro {
    width: 400px;
    height: 500px;
    /* Add any other styling you need */
  }
`;

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);  //dependency object or empty array
  return (
    <Layout>
       <style>{customStyles}</style> {/* Inject custom CSS */}
    <div className="row">
  <div className="col-md-3">
    <AdminMenu />
  </div>
  <div className="col-md-9">
    <h1 className="text-center">All Products List</h1>
    <div className="row row-cols-1 row-cols-md-2 g-4">
      {products?.map((p) => (
        <div key={p._id} className="col">
          <Link
            to={`/dashboard/admin/product/${p.slug}`}  //get single product
            className="product-link"
          >
            <div className="card cardpro">
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "400px",
                  
                }}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name.substring(0,40)}</h5>
                <p className="card-text">{p.description.substring(0,40)}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Products;



