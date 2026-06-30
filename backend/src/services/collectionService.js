import collectionModel from "../models/collectionModel.js"


export const getAllCollections = async ({ page = 1, limit = 3, search="" } = {}) => {
    const skip = (page - 1) * limit;

    const filter = search ? { "driver.name": { $regex: search, $options: "i" } } : {};

    const [collections, totalItems] = await Promise.all([
        collectionModel
        .find(filter)
        .sort({ createdAt: 1, _id: 1 })
        .skip(skip)
        .limit(limit),

        collectionModel.countDocuments(filter)
    ])

    return {
        collections,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        }
    }
    
}


export const getDriverByCollectionId = async (id) => {
    return collectionModel.findById(id).select("driver");
}


export const getProductsByCollectionId = async (id) => {
    return collectionModel.findById(id).select("products");
}


export const updateDriverByCollectionId = async (id, updatedData) => {
    const collection = await collectionModel.findById(id);

    if (!collection) {
        return null;
    }

    Object.assign(collection.driver, updatedData);

    return collection.save();
};


export const updateProductByProductId = async (id, updatedData) => {
    const collection = await collectionModel.findOne({ "products._id": id });

    if (!collection) {
        return null;
    }

    const product = collection.products.id(id);

    if (!product) {
        return null;
    }

    Object.assign(product, updatedData);

    return collection.save();
};


export const createCollection = async (data) => {
    return collectionModel.create(data);
};


export const addProductToCollection = async (id, product) => {
    return collectionModel.findByIdAndUpdate(
        id,
        { $push: { products: product } },
        {
            new: true,
            runValidators: true,
        }
    );
};


export const deleteCollectionById = async (id) => {
    return collectionModel.findByIdAndDelete(id);
};


export const deleteProductByProductId = async (id) => {
    return collectionModel.findOneAndUpdate(
        { "products._id": id },
        { $pull: { products: { _id: id } } },
        { new: true }
    );
};