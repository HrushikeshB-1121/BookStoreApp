import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

export const getWishlistDetails = async (req, res) => {
  try {
    const data = await WishlistService.getWishlistDetails(res.userId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      success: true,
      message: 'Wishlist fetched successfully',
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

export const addToWishlist = async (req, res) => {
  try {
    const data = await WishlistService.addToWishlist(
      res.userId,
      req.params._id
    );
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
    const data = await WishlistService.removeFromWishlist(
      res.userId,
      req.params._id
    );
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