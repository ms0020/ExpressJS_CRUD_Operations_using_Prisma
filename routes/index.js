import { Router } from "express";
import UserRoutes from './userRoutes.js';
import PostRoutes from './postRoutes.js';
import CommentRoutes from './commentRoutes.js';
import AuthRoutes from './authRoutes.js';
import LikeRoutes from './likeRoutes.js';
import LikeCommentRoutes from './likecommentRoutes.js';


const router = Router();

// User Routes
router.use("/api/user", UserRoutes);

// For Post Routes
router.use("/api/post", PostRoutes);

// For Comment Routes
router.use("/api/comment", CommentRoutes);

// For Like Routes
router.use("/api/like", LikeRoutes)

// For Comment Like Routes
router.use("/api/likecomment", LikeCommentRoutes)

// Auth Routes
router.use("/api/auth", AuthRoutes)


export default router;