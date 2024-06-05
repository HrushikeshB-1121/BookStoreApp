/* eslint-disable prettier/prettier */
import express from 'express';
import * as UserController from '../controllers/user.controller';
import { loginValidator, newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { userRole, adminRole } from '../middlewares/role.middleware';

const router = express.Router();

/* Admin */
router.post('/admin/registration', newUserValidator, adminRole, UserController.newUser);
// router.post('/admin/login', loginValidator, UserController.login);

/* Verify Token */
router.post('/verification', userAuth, UserController.registerUser);

/* User */
router.post('/registration', newUserValidator, userRole, UserController.newUser);
// router.post('/login', loginValidator, UserController.login);
export default router;