import express from 'express';
const router = express.Router();
import * as userController from '../controllers/user.controller';
import * as userAuth from '../middlewares/auth.middleware';
import { newUserValidator } from '../validators/user.validator';


// import userRoute from './user.route';
// import adminRoute from './admin.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {

  // router.use('/users', userRoute);
  router.post('/admin', newUserValidator,userAuth.adminRole, userController.newUser);
  router.post('/users', newUserValidator,userAuth.userRole, userController.newUser);
  // router.use('/admin', adminRoute)

  return router;
};

export default routes;
