import express from 'express';
import { userLoginAuth } from '../middlewares/auth.middleware';
import * as OrderController from '../controllers/order.controller';

const router = express.Router();

router.post('', userLoginAuth , OrderController.getOrderDetails);

export default router;