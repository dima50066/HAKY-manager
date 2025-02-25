import { Router } from "express";
import {
  addProductivityRecord,
  getProductivityRecords,
  editProductivityRecord,
  removeProductivityRecord,
  getUserProductivityRecordsById,
} from "../controllers/productivity";
import { validateBody } from "../middlewares/validateBody";
import {
  productivitySchema,
  productivityUpdateSchema,
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

export default router;
