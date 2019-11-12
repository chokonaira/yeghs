import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export class Auth {

  static generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY,);
  }
}
