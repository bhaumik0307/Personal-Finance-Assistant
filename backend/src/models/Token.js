import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true,
        ref: "User", // Assuming you have a User model
    },
    token: {
        type: String,
        required: true,
        unique: true, // Ensure tokens are unique
    },
    expiration: {
        type: Date,
        required: true,
    },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;