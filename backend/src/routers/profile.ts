import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/profile';
import { authenticate } from '../middlewares/authenticate';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/profile', authenticate, ctrlWrapper(getUserProfile));
router.patch('/profile', authenticate, upload.single('avatar'), ctrlWrapper(updateUserProfile));

export default router;
