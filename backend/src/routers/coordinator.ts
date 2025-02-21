import { Router } from "express";
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteDocumentById,
  getDocumentsById,
  uploadDocumentById,
  downloadDocumentById,
  getDocumentPreviewById,
  getEmployeeProductivityById,
  getEmployeeSalaryById,
  updateEmployeeSalaryById,
  deleteEmployeeById,
} from "../controllers/coordinator";
import { authenticate } from "../middlewares/authenticate";
import { checkRole } from "../middlewares/checkRole";
import { UserRole } from "../constants/constants";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { isValidId } from "../middlewares/isValidId";
import { upload } from "../middlewares/multer";

const router = Router();

router.get(
  "/employees",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(getAllEmployees)
);

router.get(
  "/employees/:profileId",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  isValidId("profileId"),
  ctrlWrapper(getEmployeeById)
);

router.put(
  "/employees/:profileId",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  isValidId("profileId"),
  ctrlWrapper(updateEmployeeById)
);

router.get(
  "/employees/:profileId/documents",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(getDocumentsById)
);

router.post(
  "/employees/:profileId/documents",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  upload.single("document"),
  ctrlWrapper(uploadDocumentById)
);

router.delete(
  "/employees/:profileId/documents",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(deleteDocumentById)
);

router.get(
  "/employees/:profileId/documents/:documentName/preview",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(getDocumentPreviewById)
);

router.get(
  "/employees/:profileId/documents/:documentName/download",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(downloadDocumentById)
);

router.get(
  "/employees/:profileId/productivity",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(getEmployeeProductivityById)
);

router.get(
  "/employees/:profileId/salary",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(getEmployeeSalaryById)
);

router.put(
  "/employees/:profileId/salary",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(updateEmployeeSalaryById)
);
router.delete(
  "/employees/:profileId",
  authenticate,
  checkRole(UserRole.COORDINATOR),
  ctrlWrapper(deleteEmployeeById)
);

export default router;
