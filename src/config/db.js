import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
        });
        console.log("MongoDB connected (User Service) with pooling");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

export default connectDB;
