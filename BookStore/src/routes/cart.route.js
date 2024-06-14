import express from 'express';
import * as CartController from '../controllers/cart.controller';
import {  userLoginAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('',  userLoginAuth , CartController.getCartDetails);

router.put('/:_id',  userLoginAuth , CartController.addToCart);

router.delete('/:_id',  userLoginAuth , CartController.removeFromCart);

export default router;