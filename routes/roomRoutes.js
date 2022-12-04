import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom } from "../controllers/room/roomController.js";

const router = Router();

router.route('/').post(protect,createRoom)
// router.route('/:id').post(protect, roomOperating)

export default router;