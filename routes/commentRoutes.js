import { Router } from "express";
import {createComment, deleteComment, fetchBycomment, fetchComments, updateComment  } from '../Controller/CommentController.js';


const router = Router();

router.post("/", createComment);
router.post("/all_comments", fetchComments);
router.post("/fetch_by_comment", fetchBycomment);
router.put("/:id/update_comment", updateComment);
router.delete("/:id/delete_comment", deleteComment);

export default router;