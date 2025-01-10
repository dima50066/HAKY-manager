import multer, { StorageEngine } from "multer";
import fs from "fs";
import { TEMP_UPLOAD_DIR } from "../constants/constants";

if (!fs.existsSync(TEMP_UPLOAD_DIR)) {
  fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type!"), false);
  }
};

export const upload = multer({ storage, fileFilter });
