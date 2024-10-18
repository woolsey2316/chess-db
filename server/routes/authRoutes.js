import { Router } from "express";
const router = Router();
import { register, login, refreshToken, _protected } from "../controllers/authController";
import authenticateToken from "../middlewares/authenticateToken";

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/protected", authenticateToken, _protected);

export default router;