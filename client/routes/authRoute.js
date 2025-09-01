import express from 'express'
import {
    registerController, loginController, testController, 
    forgotPasswordController, updateProfileController, 
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    sendOTP,
    resetPassword,
    resetPasswordotp
    
  } from "../controllers/authController.js";
 import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
  
// router object
const router = express.Router();

//routing
// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP);
router.post("/resetpassword",resetPasswordotp);
//REGISTER || METHOD POST
router.post("/register", registerController);




// LOGIN || POST
router.post('/login',loginController)


// test route
//${BASE_URL}/auth/test
router.get('/test',requireSignIn,isAdmin, testController)


//video 13
// normal users - protected route  auth
router.get('/user-auth',requireSignIn, (req,res) => {
  res.status(200).send({ok:true});
});


// admin protected route  auth
router.get('/admin-auth',requireSignIn,isAdmin, (req,res) => {
  res.status(200).send({ok:true});
});


// video 14
// forgot password || POST
router.post('/forgot-password', forgotPasswordController);


//update profile video 25
router.put('/profile', requireSignIn, updateProfileController);


// orders route
router.get('/orders', requireSignIn, getOrdersController);

//all get orders of users
router.get('/all-orders',requireSignIn,isAdmin, getAllOrdersController)

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;

