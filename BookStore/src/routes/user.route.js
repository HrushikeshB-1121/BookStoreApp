/* eslint-disable prettier/prettier */
import express from 'express';
import * as UserController from '../controllers/user.controller';
import { loginValidator, newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { userRole, adminRole } from '../middlewares/role.middleware';

const router = express.Router();

/* User */
router.post('/', newUserValidator, userRole, UserController.newUser);

/* Verify Token */
router.post('/verif', userAuth, UserController.registerUser);

/* Login */
router.post('/login', loginValidator, UserController.login);

/* Admin */
router.post('/admin', newUserValidator, adminRole, UserController.newUser);

export default router;