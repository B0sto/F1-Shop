import Cart from "../models/cartModel.js";

const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [],
            subtotal: 0,
        });
    }

    return cart;
};

export const getCartByUserId = async (userId) => {
    return getOrCreateCart(userId);
};

export const addItemToCart = async (userId, itemData) => {
    const cart = await getOrCreateCart(userId);

    const quantity = Number(itemData.quantity ?? 1);
    const unitPrice = Number(itemData.unitPrice);
    const size = itemData.size || "One Size";
    const sizes = Array.isArray(itemData.sizes)
        ? itemData.sizes.map((itemSize) => itemSize.toString())
        : [];

    const existingItem = cart.items.find((item) => {
        return (
            item.productId.toString() === itemData.productId &&
            item.source === itemData.source &&
            item.size === size
        );
    });

    if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.unitPrice = unitPrice;
        existingItem.selected = true;
        existingItem.sizes = sizes;
    } else {
        cart.items.push({
            productId: itemData.productId,
            source: itemData.source,
            name: itemData.name,
            image: itemData.image,
            size,
            sizes,
            quantity,
            unitPrice,
            totalPrice: unitPrice * quantity,
            selected: itemData.selected ?? true,
        });
    }

    return cart.save();
};

export const updateCartItemById = async (userId, itemId, itemData) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return null;
    }

    const item = cart.items.id(itemId);

    if (!item) {
        return null;
    }

    if (itemData.quantity !== undefined) {
        item.quantity = Number(itemData.quantity);
    }

    if (itemData.size !== undefined) {
        item.size = itemData.size;
    }

    if (itemData.selected !== undefined) {
        item.selected = itemData.selected;
    }

    return cart.save();
};

export const deleteCartItemById = async (userId, itemId) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        return null;
    }

    const item = cart.items.id(itemId);

    if (!item) {
        return null;
    }

    cart.items.pull(itemId);

    return cart.save();
};

export const clearCartByUserId = async (userId) => {
    const cart = await getOrCreateCart(userId);

    cart.items = [];

    return cart.save();
};
