import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.util.js";

export const createUser = async ({ username, email, name, password }) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        name,
        password: hashed
    });
    return user;
};

export const authenticateUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    return {
        accessToken: generateAccessToken(user._id),
        refreshToken: generateRefreshToken(user._id),
        user
    };
};

export const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");
    return user;
};
