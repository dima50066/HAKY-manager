import multer, { StorageEngine } from "multer";
import fs from "fs";
import path from "path";
import { TEMP_UPLOAD_DIR } from "../constants/constants";

if (!fs.existsSync(TEMP_UPLOAD_DIR)) {
  fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${path
      .basename(file.originalname)
      .replace(/\s/g, "_")}`;
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type! Only JPEG, PNG, and PDF are allowed."));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
