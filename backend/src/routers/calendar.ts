import express from "express";
import {
  getCalendarEntries,
  setCalendarEntry,
  removeCalendarEntry,
} from "../controllers/calendar";
import { authenticate } from "../middlewares/authenticate";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import {
  calendarEntrySchema,
  calendarEntryDeleteSchema,
} from "../validation/calendar";
import { validateBody } from "../middlewares/validateBody";

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(getCalendarEntries));

router.post(
  "/",
  authenticate,
  validateBody(calendarEntrySchema),
  ctrlWrapper(setCalendarEntry)
);

router.delete(
  "/",
  authenticate,
  validateBody(calendarEntryDeleteSchema),
  ctrlWrapper(removeCalendarEntry)
);

export default router;
