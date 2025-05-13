import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
},
    {
    timestamps: true, 
    }
)
const postModel = mongoose.model("Post", postSchema);
export default postModel;