import jwt from "jsonwebtoken";
import RefreshToken from "../models/refreshTokenModel.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js"

export const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

export const createRefreshToken = (userId) => {
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


export const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("Refresh token is required");
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const storedTokens = await RefreshToken.find({
        user: decoded.userId,
        expiresAt: { $gt: new Date() },
    });

    let matchedToken = null;

    for (const storedToken of storedTokens) {
        const isMatch = await bcrypt.compare(refreshToken, storedToken.tokenHash);

        if (isMatch) {
            matchedToken = storedToken;
            break;
        }
    }

    if (!matchedToken) {
        throw new Error("Invalid refresh token");
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
        throw new Error("User not found");
    }

    await RefreshToken.findByIdAndDelete(matchedToken._id);

    const newAccessToken = createAccessToken(user._id);
    const newRefreshToken = createRefreshToken(user._id);

    await saveRefreshToken(user._id, newRefreshToken);

    return {
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            address: user.address,
            avatar: user.avatar,
            createdAt: user.createdAt,
        },
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};


export const logoutUser = async (refreshToken) => {
    if (!refreshToken) return;

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const storedTokens = await RefreshToken.find({
            user: decoded.userId
        });

        for (const storedToken of storedTokens) {
            const isMatch = await bcrypt.compare(refreshToken. storedTokens.tokenHash);

            if (isMatch) {
                await RefreshToken.findByIdAndDelete(storedToken._id);
                break;
            }
        }
    } catch {
        return;
    }
}
