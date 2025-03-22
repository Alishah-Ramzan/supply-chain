import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
export const connectDB = async () => {
    try {
        if (!process.env.MONG0_URL) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(`mongodb+srv://alishahr797:5Mi4uaxvgYGi0D04@cluster0.ljkqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log("Error connecting to MONGODB", error.message);
        process.exit(1);
    }
};

