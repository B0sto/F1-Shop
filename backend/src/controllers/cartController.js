import {
    addItemToCart,
    clearCartByUserId,
    deleteCartItemById,
    getCartByUserId,
    updateCartItemById,
} from "../services/cartService.js";

export const getMyCart = async (req, res) => {
    try {
        const cart = await getCartByUserId(req.userId);

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const addCartItem = async (req, res) => {
    try {
        const cart = await addItemToCart(req.userId, req.body);

        res.status(201).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const cart = await updateCartItemById(req.userId, req.params.itemId, req.body);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCartItem = async (req, res) => {
    try {
        const cart = await deleteCartItemById(req.userId, req.params.itemId);

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found",
            });
        }

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await clearCartByUserId(req.userId);

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
