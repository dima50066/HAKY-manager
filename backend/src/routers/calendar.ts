import express from "express";
import {
  createCalendarRequestHandler,
  getCalendarRequestsHandler,
  respondCalendarToRequestHandler,
  confirmCalendarRequestHandler,
  declineCalendarRequestHandler,
} from "../controllers/calendar";
import { authenticate } from "../middlewares/authenticate";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { checkRole } from "../middlewares/checkRole";
import { UserRole } from "../constants/constants";
import { validateBody } from "../middlewares/validateBody";
import { requestSchema } from "../validation/calendar";

const router = express.Router();

router.post(
  "/request",
  authenticate,
  validateBody(requestSchema),
  ctrlWrapper(createCalendarRequestHandler)
);
router.get("/requests", authenticate, ctrlWrapper(getCalendarRequestsHandler));
router.post(
  "/respond/:requestId",
  authenticate,
  ctrlWrapper(respondCalendarToRequestHandler)
);
router.post(
  "/confirm/:requestId",
  authenticate,
  ctrlWrapper(confirmCalendarRequestHandler)
);

router.post(
  "/decline/:requestId",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(declineCalendarRequestHandler)
);

export default router;
