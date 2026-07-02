import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../services/authService.js"
import User from "../models/userModel.js";
import { uploadToS3, deleteFromS3 } from "../services/s3Service.js";


const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

const clearRefreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict'
}

export const register = async (req, res) => {
    try {
        const { user, accessToken, refreshToken } = await registerUser(req.body);

        res.cookie("refreshToken", refreshToken, refreshCookieOptions);

        res.status(201).json({
            success: true,
            data: {
                user,
                accessToken
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const { user, accessToken, refreshToken } = await loginUser(req.body);

        res.cookie("refreshToken", refreshToken, refreshCookieOptions);

        res.status(200).json({
            success: true,
            data: {
                user,
                accessToken
            }
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}



export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    address: user.address,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                    totalSpent: user.totalSpent
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const { username, email, address } = req.body;

        if (username) user.username = username;
        if (email) user.email = email;
        if (address !== undefined) user.address = address;

        if (req.file) {
            if (user.avatar) {
                await deleteFromS3(user.avatar)
            }

            const avatarUrl = await uploadToS3(req.file.buffer, req.file.mimetype, `${req.userId}-${Date.now()}`);
            user.avatar = avatarUrl;
        }

        await user.save();

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    address: user.address,
                    createdAt: user.createdAt,
                    totalSpent: user.totalSpent,
                    avatar: user.avatar,
                }
            }
        })
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}




export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        const { user, accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken);

        res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

        res.status(200).json({
            success: true,
            data: {
                user,
                accessToken
            }
        })
    } catch (error) {
        res.clearCookie("refreshToken", clearRefreshCookieOptions);

        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}


export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        await logoutUser(refreshToken);

        res.clearCookie("refreshToken", clearRefreshCookieOptions);

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        })
    } catch {
        res.clearCookie("refreshToken", clearRefreshCookieOptions);

        res.status(200).json({
            success: true,
            message: "Logged out Successfully"
        })
    }
}

