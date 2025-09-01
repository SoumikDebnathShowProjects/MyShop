// registering user
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";

// POST || Register route--------------------------------------------------------
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body; // getting all info
    // validations

    if (!name) {
      return res.send({ meassage: "Name is Required" });
    }
    if (!email) {
      return res.send({ meassage: "Email is Required" });
    }
    if (!password) {
      return res.send({ meassage: "Password is Required" });
    }
    if (!phone) {
      return res.send({ meassage: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ meassage: "Address is Required" });
    }
    if (!answer) {
      return res.send({ meassage: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    
    //already exisiting user  -- no registration
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "NEW User Register Successfully",
      user, // returning user object as response
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Registering : controllers/authControllerjs",
      error, //pass error object
    });
  }
};

// POST || Login route -------------------------------------------------------------------------
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password : controllers/authControllerjs",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd : controllers/authControllerjs",
      });
    }

    // decrypting password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // creating token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d", //expires in 7 days
      }
    );
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        answer: user.answer,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Loging User: controllers/authControllerjs",
      error, //pass error object
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "newPassword is required" });
    }
    // checking email and answer
    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong email or password :authController js",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error forgotPassword User: controllers/authControllerjs",
      error, //pass error object
    });
  }
};

// test controller
export const testController = (req, res) => {
  res.send("Protected Route");
};


//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};


//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders video 28
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status update 
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};
/////////////////////future use////////////////////////

import otpGenerator from "otp-generator";
import OTP from "../models/OTP.js";
// ALL are API
// Reset password by sending OTP to user's email
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Request for reset password from email:", email);

    // 1. Check if user exists
    const checkUserPresent = await userModel.findOne({ email });
    if (!checkUserPresent) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Generate unique 6-digit OTP
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let existingOtp = await OTP.findOne({ otp });
    while (existingOtp) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      existingOtp = await OTP.findOne({ otp });
    }

    // 3. Save OTP to DB
    const otpPayload = { email, otp };
    const otpEntry = await OTP.create(otpPayload);
    console.log("OTP stored in DB:", otpEntry);

    // 4. Return success response
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp, // in production, don't return OTP in response
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
////////////////////reset using otp /////////////////////////
// Reset Password Controller
export const resetPasswordotp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // 1. Check if OTP exists and valid
    const otpDoc = await OTP.findOne({ email, otp });
    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Update user's password
    const user = await userModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 4. Delete the OTP after successful use
    await OTP.deleteOne({ email, otp });

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//This part is sentding otp if the email is found
export const sendOTP = async (req, res) =>  {

    try {
        //fetch email from request ki body
      const {email} = req.body;
      console.log(email);
        //check if user already exist
        const checkUserPresent = await userModel.findOne({email});
        console.log(checkUserPresent);
        
        ///if user already exist , then return a response
        if(checkUserPresent) {
    var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated: ", otp );

        //check unique otp or not
        let result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        //create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp,
        })
        }
       else{
         return res.status(401).json({
                success:false,
                message:'User not registered',
            })
       }
        //generate otp
        
    }
    catch(error) {
      
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }


};
