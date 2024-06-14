import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

export const getCartDetails = async (req, res) => {
  try {
    const data = await CartService.getCartDetails(req.userId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Cart fetched successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

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

export const removeFromCart = async (req, res) => {
  try {
    const data = await CartService.removeFromCart(req.userId, req.params._id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'book removed from cart successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};