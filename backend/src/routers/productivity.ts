import { Router } from 'express';
import { addProductivityRecord, getProductivityRecords } from '../controllers/productivity';
import { validateBody } from '../middlewares/validateBody';
import { productivitySchema } from '../validation/productivity';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const router = Router();

router.post('/', validateBody(productivitySchema), ctrlWrapper(addProductivityRecord));
router.get('/', ctrlWrapper(getProductivityRecords)); // Додаємо маршрут для отримання всіх записів продуктивності

export default router;
