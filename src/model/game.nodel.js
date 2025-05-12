import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    itemCode: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
})

const gameProduct =  mongoose.model('GameProduct', gameSchema);

export default gameProduct;