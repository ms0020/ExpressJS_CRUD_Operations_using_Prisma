import { Router } from "express";
import { createUser, fetchById, fetchUsers, updateUser, deleteUser } from '../Controller/UserController.js';

const router = Router();

router.post("/", createUser);
router.put("/:id/update_user", updateUser);
router.post("/all_users", fetchUsers);
router.post("/:id/user_by_id", fetchById);
router.delete("/:id/delete_by_id", deleteUser);


export default router;