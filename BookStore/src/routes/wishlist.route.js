import express from 'express';
import * as WishlistController from '../controllers/wishlist.controller';
import { userLoginAuth } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('',userLoginAuth , WishlistController.getWishlistDetails);

router.post('/:_id', userLoginAuth, WishlistController.addToWishlist);

router.delete('/:_id', userLoginAuth, WishlistController.removeFromWishlist);

export default router;