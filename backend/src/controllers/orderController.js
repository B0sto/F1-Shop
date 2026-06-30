import { checkoutOrder, getOrderByUserAndId, getOrdersByUserId, getRecentOrdersByUserId } from "../services/orderService.js"

export const checkout = async (req, res) => {
    try {
        const result = await checkoutOrder(req.userId, req.body);

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        res.status(201).json({
            success: true,
            data: result
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



export const getOrders = async (req, res) => {
    try {
        const orders = await getOrdersByUserId(req.userId);

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};



export const getRecentOrders = async (rqe, res) => {
    try {
        const limit = Number(req.query.limit ?? 3);
        const orders = await getRecentOrdersByUserId(req.userId, limit);

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getOrderById = async (req, res) => {
    try {
        const order = await getOrderByUserAndId(req.userId, req.body);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}