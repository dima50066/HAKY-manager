import { Router } from 'express';
import { getAllDepartments } from '../controllers/department';

const router = Router();

router.get('/', getAllDepartments); // Викликаємо контролер для ендпоінту

export default router;
