import collectionModel from "../models/collectionModel.js"


export const getAllCollections = async ({
    page = 1,
    limit = 3,
    search = "",
    drivers = [],
    minPrice = null,
    maxPrice = null
} = {}) => {
    const collections = await collectionModel.find();

    const allDrivers = [...new Set(collections.map(c => c.driver.name))].sort();

    let filtered = collections;
    if (drivers && drivers.length > 0) {
        filtered = filtered.filter(item => drivers.includes(item.driver.name));
    }

    if (minPrice !== null || maxPrice !== null) {
        filtered = filtered.map(item => {
            const obj = item.toObject();
            obj.products = obj.products.filter(p => {
                const price = p.price;
                const matchesMin = minPrice === null || price >= minPrice;
                const matchesMax = maxPrice === null || price <= maxPrice;
                return matchesMin && matchesMax;
            });
            return obj;
        }).filter(item => item.products.length > 0);
    } else {
        filtered = filtered.map(item => item.toObject());
    }

    const getScore = (item, query) => {
        const q = query.toLowerCase();
        const name = item?.driver?.name?.toLowerCase() || "";
        let score = 0;
        if (name === q) score += 100;
        if (name.startsWith(q)) score += 80;
        if (name.includes(q)) score += 50;
        return score;
    };

    if (search.trim()) {
        filtered = filtered
            .map(item => ({
                ...item,
                score: getScore(item, search)
            }))
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score);
    }

    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    return {
        collections: paginated,
        allDrivers,
        pagination: {
            page,
            limit,
            totalItems: filtered.length,
            totalPages: Math.ceil(filtered.length / limit)
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