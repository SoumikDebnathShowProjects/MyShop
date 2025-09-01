import mongoose from "mongoose"
//connect mongodb
const connectDB = async() => {
    try{
const conn = await mongoose.connect(process.env.DATABASE);
console.log(`Connected to MongoDB HOST: ${conn.connection.host}`);
    }
    catch(error){
        console.log(`Error conecting to MongoDB: ${error}`);
    }
};
export default connectDB;

