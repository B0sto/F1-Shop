import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const SHIPPING_PRICE = 10;

const isExpirationDateValid = (expirationDate) => {
    const parts = expirationDate?.split("/").map((s) => s.trim());
    if (!parts || parts.length !== 2) return false;

    const [monthRaw, yearRaw] = parts;
    const month = Number(monthRaw);
    const year = yearRaw.length === 2 ? Number(`20${yearRaw}`) : Number(yearRaw);

    if (!month || month < 1 || month > 12 || !year) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
};

export const checkoutOrder = async (userId, checkoutData) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) return null;

    const selectedItems = cart.items.filter((item) => item.selected);
    if (selectedItems.length === 0) {
        throw new Error("No selected cart items");
    }

    if (!isExpirationDateValid(checkoutData.expirationDate)) {
        throw new Error("Card expiration date is invalid or has passed");
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
        payment: {
            cardLast4,
            expirationDate: checkoutData.expirationDate,
        },
        shipping: SHIPPING_PRICE,
    });

    const itemsTotal = selectedItems.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const totalOrderCost = itemsTotal + SHIPPING_PRICE;

    await User.findByIdAndUpdate(userId, { $inc: { totalSpent: totalOrderCost } });

    cart.items = cart.items.filter((item) => !item.selected);
    await cart.save();

    return { order, cart };
};

export const getOrdersByUserId = async (userId) => {
    return Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("user", "username email address");
};

export const getRecentOrdersByUserId = async (userId, limit = 3) => {
    return Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate("user", "username email address");
};

export const getOrderByUserAndId = async (userId, orderId) => {
    return Order.findOne({ _id: orderId, user: userId })
        .populate("user", "username email address");
};