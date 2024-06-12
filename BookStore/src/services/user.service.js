import User from '../models/user.model';
import bcrypt from 'bcrypt';
import sendmail from '../utils/email'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { log } from 'winston';

const key = process.env.SECRET_KEY;
const loginkey = process.env.LOGIN_SECRET_KEY;

import { userRegisterCache,getUserCredentials } from '../utils/redis';

//create new user
export const newUser = async (body) => {
  body.email = body.email.toLowerCase();
  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    throw new Error('User already exists');
  } else {
    body.password = await bcrypt.hash(body.password, 10);
    userRegisterCache(body);
    const token = jwt.sign( { userId :body.email,role: body.role}, key, { expiresIn: '10m' });
    const result= await sendmail(body.email,token)
    return {token ,result };
  }
};

//register user
export const registerUser = async (body) => {
  const userDetails = await getUserCredentials(body);
  const data = await User.create(userDetails);
  return data;
};


export const login = async (body) => {
  body.email = body.email.toLowerCase();
  const user = await User.findOne({email: body.email});
  if (!user || !(await bcrypt.compare(body.password, user.password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ userId: user._id , role: user.role}, loginkey, { expiresIn: '1h' });
  return { user, token };
};


//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};


//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};