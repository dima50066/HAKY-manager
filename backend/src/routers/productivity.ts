import { Router } from 'express';
import { addProductivityRecord } from '../controllers/productivity';
import { validateBody } from '../middlewares/validateBody';
import { productivitySchema } from '../validation/productivity';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.post('/', validateBody(productivitySchema), ctrlWrapper(addProductivityRecord));

export default router;
