import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const passport = require('passport');
import User from '../models/user.model';
const key = process.env.SECRET_KEY;
const loginkey = process.env.LOGIN_SECRET_KEY;

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
      success: false,
      message: 'Authorization token is required'
    };
    bearerToken = bearerToken.split(' ')[1];
    const {userId}  = await jwt.verify(bearerToken, key);
    req.data = userId;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message:  'Please enter valid token'
    });
  }
};

export const userLoginAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
    throw {
      success: false,
      message: 'Authorization token is required'
    };
    bearerToken = bearerToken.split(' ')[1];
    const {userId,role}  = await jwt.verify(bearerToken, loginkey);
    req.userId = userId;
    req.userRole = role;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Please enter valid token'
    });
  }
};

export const checkRole = async (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'UNAUTHORIZED'
    })
  }
}

export const googleAuth = async (req, res) => {
  passport.authenticate('google', async (err, user) => {
    if (err) {
      throw new Error('Authentication failed');
    }
    if (!user) {
      throw new Error('User not authenticated');
    }
    let email = user.email;
    const userdb = await User.findOne({ email })
    if (userdb === null) {
      throw new Error('Invalid email');
    }
    const token = jwt.sign({ userId: userdb._id , role: userdb.role}, loginkey, { expiresIn: '1h' });
    return res.json({ email, token });
  })(req, res);
};