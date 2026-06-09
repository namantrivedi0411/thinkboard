import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (
            !user ||
            !(await bcrypt.compare(
                password,
                user.password
            ))
        ) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        res.json({
            token: generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};