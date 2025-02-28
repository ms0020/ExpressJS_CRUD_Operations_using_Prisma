import { Router } from "express";
import { createLike, fetchLike, fetchLikeById, deleteLike } from '../Controller/LikeController.js';


const router = Router();

router.post("/", createLike);
router.post("/all_likes", fetchLike);
router.post("/fetch_like_by_id", fetchLikeById);
router.delete("/delete_like", deleteLike);

//router.delete("/:id/:user_id/delete_like", deleteLike); // When we have to give to ID in the parameters we can do like this

export default router;

