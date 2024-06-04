import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import adminRoute from './admin.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {

  router.use('/users', userRoute);

  router.use('/admin', adminRoute)

  return router;
};

export default routes;
