import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import orderRoute from './order.route'
import customerRoute from './customerDetails.route'

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {

  router.get('/', (req, res) => { res.json('Welcome') });

  router.use('/users', userRoute);

  router.use('/books',bookRoute);

  router.use('/carts', cartRoute);

  router.use('/wishlist', wishlistRoute);

  router.use('/orders', orderRoute);

  router.use('/customerDetails', customerRoute);

  return router;
};

export default routes;