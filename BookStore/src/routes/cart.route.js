import express from 'express';
import * as CartController from '../controllers/cart.controller';
import {  userLoginAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('',  userLoginAuth , CartController.getCartDetails);

router.post('/add/:_id',  userLoginAuth , CartController.addToCart);

router.post('/remove/:_id',  userLoginAuth , CartController.removeFromCart);

export default router;