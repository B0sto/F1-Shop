import { registerUser } from "../services/authService.js"

const refreshCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
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

}



export const getMe = async (req, res) => {

}

