import { Router } from "express";
import {
  addProductivityRecord,
  getProductivityRecords,
  editProductivityRecord,
  removeProductivityRecord,
  getUserProductivityRecordsById,
  recalculateUserProductivityRecords,
} from "../controllers/productivity";
import { validateBody } from "../middlewares/validateBody";
import {
  productivitySchema,
  productivityUpdateSchema,
  recalculateProductivitySchema,
} from "../validation/productivity";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post(
  "/",
  authenticate,
  validateBody(productivitySchema),
  ctrlWrapper(addProductivityRecord)
);
router.get("/", authenticate, ctrlWrapper(getProductivityRecords));
router.put(
  "/:id",
  authenticate,
  validateBody(productivityUpdateSchema),
  ctrlWrapper(editProductivityRecord)
);
router.delete("/:id", authenticate, ctrlWrapper(removeProductivityRecord));
router.get(
  "/:userId",
  authenticate,
  ctrlWrapper(getUserProductivityRecordsById)
);

router.post(
  "/recalculate",
  authenticate,
  validateBody(recalculateProductivitySchema),
  ctrlWrapper(recalculateUserProductivityRecords)
);

export default router;
