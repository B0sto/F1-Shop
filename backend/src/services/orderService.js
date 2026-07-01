import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const SHIPPING_PRICE = 10;


export const checkoutOrder = async (userId, checkoutData) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) return null;

    const selectedItems = cart.items.filter(item => item.selected);

    if (selectedItems.length === 0) {
        throw new Error("No selected cart items");
    }

    const cardNumber = checkoutData.cardNumber?.replace(/\s/g, "");
    const cardLast4 = cardNumber?.slice(-4);

    const order = await Order.create({
        user: userId,
        items: selectedItems.map((item) => ({
            productId: item.productId,
            source: item.source,
            name: item.name,
            image: item.image,
            size: item.size,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
        })),
        customer: {
            fullName: checkoutData.fullName,
            phone: checkoutData.phone,
            email: checkoutData.email,
            location: checkoutData.location,
        },
        payment: {
            cardLast4,
        },
        shipping: SHIPPING_PRICE,
    });

    const itemsTotal = selectedItems.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const totalOrderCost = itemsTotal + SHIPPING_PRICE;

    await User.findByIdAndUpdate(
        userId,
        { $inc: { totalSpent: totalOrderCost } }
    )

    cart.items = cart.items.filter(item => !item.selected);
    await cart.save();

    return {
        order,
        cart
    }
}


export const getOrdersByUserId = async (userId) => {
    return Order.find({ user: userId }).sort({ createdAt: -1 });
};


export const getRecentOrdersByUserId = async (userId, limit = 3) => {
    return Order.find({user: userId})
    .sort({ createdAt: -1 })
    .limit(limit)
};


export const getOrderByUserAndId = async (userId, orderId) => {
    return Order.findOne({
        _id: orderId,
        user: userId
    })
}