import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
// its a mdilleware so 3 arguments || next=it allows us to move to next code

//  user signin ==  role= 0 normal user
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization, process.env.JWT_SECRET_KEY
    );
    req.user = decode; //for getting id
    next();
  } catch (error) {
    console.log("authMiddleware js error :",error);
  }
};

//admin acceess == role =1  in db
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access for admin: MiddleWare js",
      });
    } else {
      next(); // allow ascess for admin
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};