import { Router } from "express";
import {
  fetchUserHistory,
  fetchDepartmentRanking,
  fetchDailyRanking,
  fetchAllUsers,
} from "../controllers/ranking";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.get("/me", authenticate, fetchUserHistory);
router.get("/department", authenticate, fetchDepartmentRanking);
router.get("/daily", authenticate, fetchDailyRanking);
router.get("/users", authenticate, fetchAllUsers);
export default router;
