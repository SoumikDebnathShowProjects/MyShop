import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">

<div className="text-center">
  <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>All Categories</h1>
  <p style={{ fontSize: '1.2rem', color: '#666' }}>All categories are listed below</p>
</div>


          {categories.map((c) => (
            

            // <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
            //   <Link to={`/category/${c.slug}`} className="btn btn-primary">
            //     {c.name}
            //   </Link>
            // </div>
          


            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}  >
            <Link to={`/category/${c.slug}`} className="card-link" style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{c.name}</h5>
                  <p className="card-text">Click to view category</p>
                </div>
              </div>
            </Link>
          </div>
          

          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;