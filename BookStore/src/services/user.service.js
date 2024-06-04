import User from '../models/user.model';
import bcrypt from 'bcrypt';
import sendmail from '../utils/email'
import jwt from 'jsonwebtoken';
dotenv.config();
const key = process.env.SECRET_KEY;

//create new user
export const newUser = async (body) => {
  body.email = body.email.toLowerCase();
  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    throw new Error('User already exists');
  } else {
    body.password = await bcrypt.hash(body.password, 10);
    const token = jwt.sign( body, key, { expiresIn: '10m' });
    const result= await sendmail(user.email,token)
    return {token ,result };
    //const data = await User.create(body);
    return data;
  }
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
