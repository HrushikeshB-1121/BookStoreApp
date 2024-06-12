import express from 'express';
import * as WishlistController from '../controllers/wishlist.controller';
import { userLoginAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('', userLoginAuth, WishlistController.getWishlistDetails);

router.post('/add/:_id', userLoginAuth, WishlistController.addToWishlist);

router.post('/remove/:_id', userLoginAuth, WishlistController.removeFromWishlist);

export default router;