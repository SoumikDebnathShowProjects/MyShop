import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true  // removes whitespace
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true, 
    },
    phone:{
        type:String,
        required:true,
   
    },
    address:{
        type:String,
        required:true,
     
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0      // 0 means user 1 means admin
    }
},
{timestamps: true}   // add new user created time
)


export default mongoose.model('user', userSchema);
















































