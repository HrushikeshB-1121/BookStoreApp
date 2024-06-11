import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';


export const addToCart = async (req, res) => {
  try {
    const data = await CartService.addToCart(req.userId, req.params._id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book added to cart successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};
