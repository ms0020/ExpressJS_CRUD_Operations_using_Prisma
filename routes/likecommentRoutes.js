import { Router } from "express";
import { createLikeComment, fetchCommentLikesById, deleteCommentLike } from '../Controller/LikeCommentController.js';


const router = Router();

router.post("/", createLikeComment);
//router.post("/all_likes", fetchLikeComment);
router.post("/fetch_comment_like_by_id", fetchCommentLikesById);
router.delete("/delete_comment_like", deleteCommentLike);

//router.delete("/:id/:user_id/delete_like", deleteLike); // When we have to give to ID in the parameters we can do like this

export default router;


// 