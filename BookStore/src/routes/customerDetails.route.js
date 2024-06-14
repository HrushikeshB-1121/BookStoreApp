import express from 'express';
import { userLoginAuth } from '../middlewares/auth.middleware';
import * as CustomerController from '../controllers/customerDetails.controller';

const router = express.Router();

router.get('',userLoginAuth , CustomerController.getCustomerDetails);

router.post('',userLoginAuth , CustomerController.addCustomerDetails);

export default router;