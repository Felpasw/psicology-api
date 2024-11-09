import { Request, Response, NextFunction } from 'express';
import userModel from '../config/tableModels/user';
import dbo from '../dbo/base';

const validate = async (req: Request, res: Response, next: NextFunction) => {
  
  if (req.cookies.cookieID) {
    const response = await dbo.get(userModel, { _id: req.cookies.cookieID });
    if (response) {
      return next();
    }
  }
  return res.sendStatus(401);
};

export default { validate };
