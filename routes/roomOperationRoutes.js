import { Router } from "express";
import { roomOperating } from "../controllers/room/roomOperationController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();

router.route('/:id').connect(roomOperating)

export default router;