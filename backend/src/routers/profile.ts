import express from "express";
import {
  createProfileController,
  getProfileController,
  updateProfileController,
  uploadDocumentController,
  getDocumentsController,
  deleteDocumentController,
  getDocumentPreviewController,
} from "../controllers/profile";
import { authenticate } from "../middlewares/authenticate";
import { profileSchema, documentSchema } from "../validation/profile";
import { validateBody } from "../middlewares/validateBody";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  upload.single("avatar"),
  validateBody(profileSchema),
  ctrlWrapper(createProfileController)
);

router.get("/", authenticate, ctrlWrapper(getProfileController));

router.put(
  "/update",
  authenticate,
  upload.single("avatar"),
  validateBody(profileSchema),
  ctrlWrapper(updateProfileController)
);

router.post(
  "/documents/upload",
  authenticate,
  upload.single("document"),
  validateBody(documentSchema),
  ctrlWrapper(uploadDocumentController)
);

router.get("/documents", authenticate, ctrlWrapper(getDocumentsController));

router.delete(
  "/documents",
  authenticate,
  ctrlWrapper(deleteDocumentController)
);

router.get(
  "/documents/preview/:documentName",
  authenticate,
  ctrlWrapper(getDocumentPreviewController)
);

export default router;
