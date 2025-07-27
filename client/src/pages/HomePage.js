import React, { useState, useEffect, useRef } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Loading from "./Loading";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noProductsAvailable, setNoProductsAvailable] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleInfiniteScroll = async () => {
    // console.log("scroll height " + document.documentElement.scrollHeight);
    // console.log("Inner Height "+ window.innerHeight);
    // console.log("scroll Top " + document.documentElement.scrollTop);
    // scroll top  + Inner height >= scroll height
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 5 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      // setProducts(data.products);
      // setProducts((prev) => [...prev, ...data]);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // video 21
  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      //    setProducts(data?.products);
      if (data && data.products && data.products.length > 0) {
        // If products are available, update the state
        setProducts(data.products);
        setNoProductsAvailable(false); // Reset the flag
      } else {
        // If no products are available, set the flag
        setNoProductsAvailable(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best offers "}>
      {/* banner image */}

      {/* <img
        // src="/images/rogbb.jpg"
        src="https://i.ytimg.com/vi/OFvXuyITwBI/sddefault.jpg"

        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner banner-img ">
          <div className="carousel-item active">
            <img
              src="https://www.techadvisor.com/wp-content/uploads/2022/06/google_pixel_6_6_pro_collage_official_press_image.jpg?quality=50&strip=all"
              className="banner-img "
              alt="bannerimage1"
              style={{ width: "100%" }}
              loading="lazy"
            />
          </div>
          <div className="carousel-item banner-img ">
            <img
              src="https://9to5mac.com/wp-content/uploads/sites/6/2023/01/m2-macbook-pros-rumor.jpg?quality=82&strip=all&w=1024"
              className="banner-img "
              alt="bannerimage2"
              width={"100%"}
              loading="lazy"
            />
          </div>
          <div className="carousel-item banner-img ">
            <img
              src="https://i.ytimg.com/vi/dJCA_RxBXuA/maxresdefault.jpg"
              className="banner-img "
              alt="bannerimage3"
              width={"100%"}
              loading="lazy"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* banner image */}

      <div className="container-fluid row mt-2">
        <div className="col-md-2">
          <h4 className="text-center mt-4">Filter By Category</h4>

          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <div key={c._id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                />
                <label className="form-check-label" htmlFor={c._id}>
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()} //just reload the page for reseting filters
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 col-12">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {/* Your existing JSX code */}
            {noProductsAvailable && (
              <div className="alert alert-info mt-3" role="alert">
                No products available under this filter. You might like this
              </div>
            )}
            {products?.map((p) => (
              <Link
                to={`/product/${p.slug}`}
                className="card-link"
                style={{ textDecoration: "none" }}
              >
                <div className="container d-flex justify-content-center">
                  <div className="card cardpro m-2" style={{ width: "18rem" }}>
                    {/* <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "280px",
                      }}
                      alt={p.name}
                    /> */}

{!imageLoaded && (
        <div className="skeleton skeleton-image" style={{ width: '100%', height: '280px' }}> </div>
      )}
      <img
        src={`/api/v1/product/product-photo/${p._id}`}
        className={`card-img-top ${imageLoaded ? '' : 'hidden'}`}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '280px',
        }}
        loading="lazy"
        alt={p.name}
        onLoad={handleImageLoad}
      />
 <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">
          {!imageLoaded && <div className="skeleton skeleton-text"></div>}
          {p.name.substring(0, 40)}
        </h5>
        <p className="card-text">
          {!imageLoaded && (
            <>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </>
          )}
          {p.description.substring(0, 30)}...
        </p>
    


                    {/* <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">
                        <div className="skeleton skeleton-text"></div>
                        {p.name.substring(0, 40)}
                      </h5>
                      <p className="card-text">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                        {p.description.substring(0, 30)}...
                      </p> */}
                      <p className="card-text">$ {p.price}</p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-primary ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-secondary ms-1"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item added to cart");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* <divxx className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </divxx> */}
        </div>
      </div>
      {loading && <Loading />}
    </Layout>
  );
};

export default HomePage;
