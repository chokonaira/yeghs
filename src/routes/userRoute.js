import express from 'express';
import UserController from '../controllers/userController';
import userValidator from '../middlewares/validators/userValidator';
import validate from '../middlewares/validators/validate';

const { usernameValidator, 
        emailValidator, 
        phoneValidator,
        passwordValidator 
        } = userValidator;

const router = express.Router();

router.post('/auth/signup', 
usernameValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  validate,
  UserController.userSignup);

router.post('/auth/login', 
  emailValidator,
  passwordValidator,
  validate,
  UserController.userLogin);

export default router;