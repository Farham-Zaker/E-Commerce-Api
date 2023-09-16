import { Router } from 'express';
const router = Router()
import authController from '../controllers/auth.controller';

router.post('/register', authController.registerRoute)
router.post('/login', authController.loginRoute)

router.get('/google', )
router.get('/google/callback', )
export default router;