import mongoose from 'mongoose';
import { mailSender } from '../utils/mailSender.js';

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 300,
    }
});


//a function -> to send emails
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "MyShop", otp);
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
}) 



export default mongoose.model("OTP", OTPSchema);

