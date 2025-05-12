import mongoose from "mongoose";

const topupOrderSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true,

    },
    userGameid: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GameProduct',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'proses', 'sucses'],
        default: 'pending',
    },
    note: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const topupOrders =  mongoose.model('topuporder', topupOrderSchema)

export default topupOrders;