import { Router } from 'express';
import { addProductivityRecord, getProductivityRecords, editProductivityRecord, removeProductivityRecord } from '../controllers/productivity';
import { validateBody } from '../middlewares/validateBody';
import { productivitySchema, productivityUpdateSchema } from '../validation/productivity';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.post('/', validateBody(productivitySchema), ctrlWrapper(addProductivityRecord));
router.get('/', ctrlWrapper(getProductivityRecords));
router.put('/:id', validateBody(productivityUpdateSchema), ctrlWrapper(editProductivityRecord));
router.delete('/:id', ctrlWrapper(removeProductivityRecord));

export default router;
