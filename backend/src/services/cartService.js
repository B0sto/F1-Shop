import Cart from "../models/cartModel.js";

const MAX_QUANTITY = 15;

const recalcSubtotal = (cart) => {
    cart.subtotal = cart.items.reduce((sum, item) => {
        return sum + item.quantity * item.unitPrice;
    }, 0);
};

const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({user: userId});

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [],
            subtotal: 0,
        });
    }

    return cart;
};


const findCartItem = (cart, productId, source, size, excludeItemId = null) => {
    return cart.items.find(item =>
        item.productId.toString() === productId.toString() &&
        item.source === source &&
        item.size === size &&
        (!excludeItemId || item._id.toString() !== excludeItemId.toString())
    );
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

    const existingItem = findCartItem(cart, itemData.productId, itemData.source, size);

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > MAX_QUANTITY) {
            throw new Error("Only 15 items are allowed per product size");
        }

        existingItem.quantity = newQuantity;
        existingItem.unitPrice = unitPrice;
        existingItem.selected = true;
        existingItem.sizes = sizes;
    } else {
        if (quantity > MAX_QUANTITY) {
            throw new Error("Only 15 items are allowed per product size");
        }
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

    recalcSubtotal(cart);
    return cart.save();
};

export const updateCartItemById = async (userId, itemId, itemData) => {
    const cart = await Cart.findOne({user: userId});

    if (!cart) {
        return null;
    }

    const item = cart.items.id(itemId);

    const oldSize = item.size;
    const newSize = itemData.size;

    if (!item) {
        return null;
    }

    if (itemData.quantity !== undefined) {
        const quantity = Number(itemData.quantity);

        if (quantity < 1 || quantity > MAX_QUANTITY) {
            throw new Error("Quantity must be between 1 and 15.");
        }

        item.quantity = quantity;
    }

    if (itemData.size !== undefined && itemData.size !== oldSize) {

        const existingItem = findCartItem(
            cart,
            item.productId,
            item.source,
            newSize,
            item._id
        );

        if (existingItem) {
            const total = existingItem.quantity + item.quantity;

            if (total > MAX_QUANTITY) {
                throw new Error("Only 15 items allowed per product size.");
            }

            existingItem.quantity = total;

            cart.items.pull(item._id);

        } else {
            item.size = newSize;
        }
    }

    if (itemData.selected !== undefined) {
        item.selected = itemData.selected;
    }

    recalcSubtotal(cart);
    return cart.save();
};

export const deleteCartItemById = async (userId, itemId) => {
    const cart = await Cart.findOne({user: userId});

    if (!cart) {
        return null;
    }

    const item = cart.items.id(itemId);

    if (!item) {
        return null;
    }

    cart.items.pull(itemId);

    recalcSubtotal(cart);
    return cart.save();
};

export const clearCartByUserId = async (userId) => {
    const cart = await getOrCreateCart(userId);

    cart.items = [];

    recalcSubtotal(cart);
    return cart.save();
};
