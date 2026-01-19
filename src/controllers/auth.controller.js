import * as userService from "../services/user.service.js";
import Joi from "joi";

// Define validation schemas
const signupSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(50).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const signup = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = signupSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const user = await userService.createUser(value); // value contains validated fields
        res.status(201).json({ message: "User created", userId: user._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const result = await userService.authenticateUser(value);

        if (!result) return res.status(401).json({ message: "Invalid credentials" });

        res.json({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const profile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.user.id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
