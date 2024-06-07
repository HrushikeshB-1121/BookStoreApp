import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const key = process.env.SECRET_KEY;

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
    throw {
      code: HttpStatus.BAD_REQUEST,
      message: 'Authorization token is required'
    };
    bearerToken = bearerToken.split(' ')[1];
    const {userId,role}  = await jwt.verify(bearerToken, key);
    req.data = userId;
    req.userRole = role;
    console.log(userId);
    console.log(role);
    next();
  } catch (error) {
    next(error);
  }
};

export const checkRole = async (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: `${error}`
    })
  }
}