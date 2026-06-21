import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshTokenModel.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js"

const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
}


const saveRefreshToken = async (userId, refreshToken) => {
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    const refreshTokenDays = Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + refreshTokenDays);

    await RefreshToken.create({
        user: userId,
        tokenHash,
        expiresAt,
    });
};


export const registerUser = async (userData) => {
    const { username, email, password, address, avatar } = userData;

    if (!username || !email || !password) {
        throw new Error("Username, email and password are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        address,
        avatar
    });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    await saveRefreshToken(user._id, refreshToken);

    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            address: user.address,
            avatar: user.avatar,
            createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
    };
}


export const loginUser = async (userData) => {
    const { email, password } = userData;

    if (!email || !password) {
        throw new Error("Email and Password are required");
    }

    const user = await User.findOne({ email }).select("+password");


    if (!user) {
        throw new Error("Invalid Email or Password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid Email or Password");
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    await saveRefreshToken(user._id, refreshToken);


    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            address: user.address,
            avatar: user.avatar,
            createdAt: user.createdAt,
        },
        accessToken,
        refreshToken,
    };



}
