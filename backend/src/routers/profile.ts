import express from 'express';
import { createProfileController, getProfileController, updateProfileController } from '../controllers/profile';
import { authenticate } from '../middlewares/authenticate';
import { profileSchema } from '../validation/profile';
import { validateBody } from '../middlewares/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { upload } from '../middlewares/multer';

const router = express.Router();

router.post('/create', authenticate, upload.single('avatar'),  validateBody(profileSchema), ctrlWrapper(createProfileController));

router.get('/', authenticate, ctrlWrapper(getProfileController));

router.put('/update', authenticate, validateBody(profileSchema), ctrlWrapper(updateProfileController));

export default router;
