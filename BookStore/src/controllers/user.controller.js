import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import logger from '../config/logger';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newUser = async (req, res) => {
  try {
    const data = await UserService.newUser(req.body);
    logger.info('Mail sent successfully');
    res.status(HttpStatus.CREATED).json({
      success: true,
      code: HttpStatus.CREATED,
      token: data.token,
      message: 'Mail sent successfully'
    });
  } catch (error) {
    logger.error(`error while creating user`)
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const data = await UserService.registerUser(req.data);
    logger.info('User data saved successfully');
    res.status(HttpStatus.CREATED).json({
      success: true,
      code: HttpStatus.CREATED,
      data: data.email,
      message: 'User data saved successfully'
    });
  } catch (error) {
    logger.error(`error while creating user`)
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const login= async (req, res) => {
  try {
    const data = await UserService.login(req.body);
    logger.info('User loggedIn successfully');
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'User loggedIn successfully',
      data: {
        success: true,
        firstName: data.user.firstName,
        email: data.user.email,
        token: data.token
      },
    });

  } catch (error) {
    logger.error(`User login failed`)
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
  
}


/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};


/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
