import { Router } from "express";
import {createPost, fetchByPost, fetchPosts, updatePost, deletePost, searchPost } from '../Controller/PostController.js';

const router = Router();

router.post("/", createPost);
router.post("/search", searchPost);
router.post("/all_posts", fetchPosts);
router.post("/:id/fetch_by_post", fetchByPost);
router.put("/:id/update_post", updatePost);
router.delete("/:id/delete_post", deletePost);



export default router;