import { Router } from "express";
import authRouter from "./auth";
import productivityRouter from "./productivity";
import profileRouter from "./profile";
import departmentRouter from "./department";
import salaryRouter from "./salary";
import calendarRouter from "./calendar";
import coordinatorRouter from "./coordinator";

const router = Router();

router.use("/auth", authRouter);
router.use("/productivity", productivityRouter);
router.use("/profile", profileRouter);
router.use("/departments", departmentRouter);
router.use("/salary", salaryRouter);
router.use("/calendar", calendarRouter);
router.use("/coordinator", coordinatorRouter);

export default router;
