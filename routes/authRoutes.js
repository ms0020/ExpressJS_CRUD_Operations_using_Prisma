import { Router } from "express";
import { userLogin, refToken, deleteToken } from '../Controller/AuthController.js';

const router = Router();


router.post("/login", userLogin);
router.post('/refresh_token', refToken);
router.delete('/refresh_token', deleteToken);

export default router;