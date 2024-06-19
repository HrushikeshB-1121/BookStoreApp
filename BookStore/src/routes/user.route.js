/* eslint-disable prettier/prettier */
import express from 'express';
import * as UserController from '../controllers/user.controller';
import { loginValidator, newUserValidator } from '../validators/user.validator';
import { userAuth , googleAuth } from '../middlewares/auth.middleware';
import { userRole, adminRole } from '../middlewares/role.middleware';
const passport = require('passport');
const router = express.Router();

/* User */
router.post('/', newUserValidator, userRole, UserController.newUser);

/* Verify Token */
router.post('/verification', userAuth, UserController.registerUser);

/* Login */
router.post('/login', loginValidator, UserController.login);

/* Admin */
router.post('/admin', newUserValidator, adminRole, UserController.newUser);

router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', googleAuth);

export default router;