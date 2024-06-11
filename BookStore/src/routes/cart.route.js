import express from 'express';
import * as CartController from '../controllers/cart.controller';
import {  userLoginAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('/add/:_id',  userLoginAuth , CartController.addToCart);

export default router;