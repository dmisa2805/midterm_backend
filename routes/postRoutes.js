import express from "express";
import {createPost,updatePost} from '../controllers/postController.js';
import {verifyApiKey} from '../middleware/auth.js';

const router = express.Router();

router.post("/", verifyApiKey, createPost);
router.put("/:id", verifyApiKey, updatePost);

export default router; 