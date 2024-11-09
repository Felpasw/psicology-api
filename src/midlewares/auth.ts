import { Request, Response, NextFunction } from 'express';
import userModel from '../config/tableModels/user';
import computerModel from '../config/tableModels/computer';
import dbo from '../dbo/base';

const validate = async (req: Request, res: Response, next: NextFunction) => {
  return next();
  
  if (req.cookies.cookieID) {
    const response = await dbo.get(userModel, { _id: req.cookies.cookieID });
    if (response) {
      return next();
    }
  }

  if (req.headers.authorization) {
    const { route } = req.params;

    const response = await dbo.get(computerModel, { SN: req.headers.authorization });
    if (!response) {
      return res.sendStatus(401); 
    }

    if (route === 'queue') {
      if (req.method === 'GET') {
        return next();
      } else if (req.method === 'PUT') {
        return next();
      }
    } else if (route === 'computer' && req.method === 'POST') {
      return next();
    } else if (route === 'test' && req.method === 'POST') {
      return next();
    }
  }

  return res.sendStatus(401);
};

export default { validate };
