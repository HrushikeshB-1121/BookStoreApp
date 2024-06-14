import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

export const getWishlistDetails = async (req, res) => {
  try {
    const data = await WishlistService.getWishlistDetails(req.userId);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Wishlist fetched successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const data = await WishlistService.addToWishlist(req.userId,req.params._id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book added to wishlist successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const data = await WishlistService.removeFromWishlist(req.userId,req.params._id);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Book removed from wishlist successfully',
      data: data
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: `${error}`
    });
  }
};