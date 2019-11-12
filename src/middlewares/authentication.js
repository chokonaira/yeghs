import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../db/models/user';

dotenv.config();

const authenticate = async (req, res, next) => {
  
  const token = req.header('token') || req.body.token || req.query.token;
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'access denied, no token provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = decoded;
    const user = await User.findOne({email});
    if(user) {
      req.authUser = user;
    }else{
      req.authUser = decoded;
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'authentication failed, please login again',
    });
  }
};

export default authenticate;
