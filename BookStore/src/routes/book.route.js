import express from 'express';
import * as BooksController from "../controllers/book.controller"
import { checkRole, userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.get('', userAuth, BooksController.getAllbooks);


router.get('/:_id',userAuth,BooksController.getBookById);


router.delete('/:_id',userAuth, checkRole, BooksController.deleteBookById)

export default router;