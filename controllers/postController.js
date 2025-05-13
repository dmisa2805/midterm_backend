import postModel from "../models/Post.js";

//Create post
export const createPost = async (req, res) => {
    try {
        const {content} = req.body;
        //Error
        if (!content) {
            return res.status(400).json({message: "Content is required"});
        };
        //Success
        const newPost = new postModel({userId: req.user._id, content});
        await newPost.save();
        res.status(201).json({message: "Post created successfully"});
} catch (error) {
    res.status(500).json({ message: error.message });
}
}
//Update post
export const updatePost = async (req, res) => {
    try {
        const {id} = req.params;
        const {content} = req.body;
        const post = await postModel.findById(id);
        //Error
        if (!post) {
            return res.status(404).json({message: "Post not found"});
        }
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({message: "Unauthorized"})
        }
        //Success
        post.content = content || post.content;
        post.updatedAt = new Date();
        await post.save();
        res.status(200).json({message: "Post updated successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}