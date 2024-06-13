import express from 'express';
import { userLoginAuth } from '../middlewares/auth.middleware';
import * as CustomerController from '../controllers/customerDetails.controller';

const router = express.Router();

router.post('',userLoginAuth , CustomerController.addCustomerDetails);

router.get('',userLoginAuth , CustomerController.getCustomerDetails);

export default router;