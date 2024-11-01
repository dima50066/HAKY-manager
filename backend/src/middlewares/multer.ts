import multer, { StorageEngine } from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/constants';

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    console.log('Uploading file:', file.originalname);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
