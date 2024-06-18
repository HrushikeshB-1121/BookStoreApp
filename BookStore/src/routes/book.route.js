import express from 'express';
import * as BooksController from "../controllers/book.controller"
import { checkRole,userLoginAuth } from '../middlewares/auth.middleware';

const router = express.Router();

/* User and Admin - Products */
router.get('', userLoginAuth, BooksController.getAllbooks);


router.get('/:_id',userLoginAuth,BooksController.getBookById);

/* Admin - Products */
router.put('/:_id',userLoginAuth, checkRole, BooksController.updateBookById);


router.delete('/:_id',userLoginAuth, checkRole, BooksController.deleteBookById);

export default router;