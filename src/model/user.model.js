import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
     },
     password: {
        type: String,
        required: true,
        minlength: 6
     }
}, {timestamps: true})

const user = mongoose.model("user", userSchema);

export default user;
