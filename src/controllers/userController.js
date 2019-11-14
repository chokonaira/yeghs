import bcrypt from "bcrypt";
import Cryptr from "cryptr";
const cryptr = new Cryptr("myTotalySecretKey");

import { Auth } from "../middlewares/generateToken";
import User from "../db/models/user";
import { hashPassword } from "../helpers/helper";

const { generateToken } = Auth;

class UserController {
  static async userSignup(req, res) {
    try {
      const { username, email, phone, authorizationPin, password } = req.body;
      const encryptedpin = cryptr.encrypt(authorizationPin);
      const hashedpassword = await hashPassword(password);
      const values = {
        username,
        email,
        phone,
        authorizationPin: encryptedpin,
        password: hashedpassword
      };
      const user = new User(values);
      await user.save();

      const token = await generateToken({ username, email });

      return res
        .header("x-access-token", token)
        .status(201)
        .json({
          status: 201,
          message: "Registeration Successful",
          user: {
            _id: user._id,
            username: user.username,
            phone: user.phone,
            email: user.email
          },
          token
        });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const result = await User.findOne({ email });
      if (result) {
        if (bcrypt.compareSync(password, result.password)) {
          const { username, email } = result;
          const token = await generateToken({ username, email });

          const existingUser = { username, email };

          return res.status(200).json({
            status: 200,
            message: "User Login successful",
            existingUser,
            token
          });
        }
        return res.status(401).json({
          status: 401,
          message: "Invalid email or password"
        });
      }
      return res.status(401).json({
        status: 401,
        message: "Invalid email or password"
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}

export default UserController;
