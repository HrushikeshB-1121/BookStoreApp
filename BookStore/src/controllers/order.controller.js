import HttpStatus from 'http-status-codes';
import * as OrderService from '../services/order.service';

export const getOrderDetails = async (req, res) => {
  try {
    const data = await OrderService.getOrderDetails(req.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'orders fetched successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: `${error}`
    });
  }
};