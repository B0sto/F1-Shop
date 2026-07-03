import collectionModel from "../models/collectionModel.js"


export const getAllCollections = async ({page = 1, limit = 3, search = ""} = {}) => {

    const collections = await collectionModel.find();

    const getScore = (item, query) => {
        const q = query.toLowerCase();

        const name = item?.driver?.name?.toLowerCase() || "";

        let score = 0;

        if (name === q) score += 100;
        if (name.startsWith(q)) score += 80;
        if (name.includes(q)) score += 50;

        return score;
    };

    let result;

    if (search.trim()) {
        result = collections
            .map(item => ({
                ...item.toObject(), score: getScore(item, search)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);
    } else {
        result = collections.map(item => item.toObject());
    }

    const skip = (page - 1) * limit;
    const paginated = result.slice(skip, skip + limit);

    return {
        collections: paginated, pagination: {
            page, limit, totalItems: result.length, totalPages: Math.ceil(result.length / limit)
        }
    };
};


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
    const collection = await collectionModel.findOne({"products._id": id});

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
    return collectionModel.findByIdAndUpdate(id, {$push: {products: product}}, {
        new: true, runValidators: true,
    });
};


export const deleteCollectionById = async (id) => {
    return collectionModel.findByIdAndDelete(id);
};


export const deleteProductByProductId = async (id) => {
    return collectionModel.findOneAndUpdate({"products._id": id}, {$pull: {products: {_id: id}}}, {new: true});
};