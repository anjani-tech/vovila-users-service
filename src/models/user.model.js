import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        name: String,
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
