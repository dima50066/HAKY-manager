import { Router } from 'express';
import { getAllDepartments } from '../controllers/department';

const router = Router();

router.get('/', getAllDepartments);

export default router;
