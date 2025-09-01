import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  saveProductController,        // Add this import
  getSavedProductsController    // Add this import
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createHubController,
  getAllHubsController,
  getSingleHubController,
  updateHubController,
  deleteHubController,
} from "../controllers/HubController.js";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// this are end points

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

// Save/Unsave product route
router.put(
  "/save-product/:pid",
  requireSignIn,                // User must be logged in
  saveProductController
);

// Get saved products route
router.get(
  "/saved-products",
  requireSignIn,                // User must be logged in
  getSavedProductsController
);

// payments routes
// getting token
router.get("/braintree/token", braintreeTokenController);

// payements routes
router.post('/braintree/payment', requireSignIn, brainTreePaymentController);

//Hub
router.post("/hubs", requireSignIn, isAdmin, createHubController);
router.get("/hubs", requireSignIn, isAdmin, getAllHubsController);
router.get("/hubs/:id", requireSignIn, isAdmin, getSingleHubController);
router.put("/hubs/:id", requireSignIn, isAdmin, updateHubController);
router.delete("/hubs/:id", requireSignIn, isAdmin, deleteHubController);

export default router;