import { Router } from "express";
import authRouter from "./auth";
import productivityRouter from "./productivity";
import profileRouter from "./profile";
import departmentRouter from "./department";
import salaryRouter from "./salary";
import calendarRouter from "./calendar";

const router = Router();

router.use("/auth", authRouter);
router.use("/productivity", productivityRouter);
router.use("/profile", profileRouter);
router.use("/departments", departmentRouter);
router.use("/salary", salaryRouter);
router.use("/calendar", calendarRouter);

export default router;
