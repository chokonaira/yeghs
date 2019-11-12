import { validationResult } from 'express-validator';

const validate = (req, res, next) => {
  const errorFormatter = ({ msg }) => `${msg}`;
  const validationError = validationResult(req).formatWith(errorFormatter);

  if (!validationError.isEmpty()) {
    const errorMsg = validationError.mapped();

    return res.status(400).json({
      status: 400,
      message: errorMsg,
    });
  }
  return next();
};

export default validate;
