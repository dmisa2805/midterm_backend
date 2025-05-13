import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    apiKey: { type: String },

})
const userModel = mongoose.model("User", userSchema);
export default userModel;