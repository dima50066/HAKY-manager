import { Router } from 'express';
import { calculateUserSalaryController, getUserSalaryHistoryController, updateUserSalaryController } from '../controllers/salary';
import { authenticate } from '../middlewares/authenticate'; 

const router = Router();

router.post('/calculate', authenticate, calculateUserSalaryController);
router.get('/history', authenticate, getUserSalaryHistoryController);
router.put('/update', authenticate, updateUserSalaryController);

export default router;
