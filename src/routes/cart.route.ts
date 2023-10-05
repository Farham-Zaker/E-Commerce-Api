import { Router } from 'express';
import isLogged from '../middlewares/isLogged';
const router = Router()

router.post('/add', isLogged)

export default router;