import { Response, Request } from 'express'
import { post } from '../routes/login'
import moment from 'moment'
import UserModel from '../config/tableModels/user'
import dbo from '../dbo/base'


const insert = async (req: Request, res: Response) => {
  const object = req.body
  const response = await dbo.get(UserModel, object)

  if(response){
    const expiration = moment().add(1, 'hours').toDate()
    res.cookie('cookieID', response[0]._id, { expires: expiration, httpOnly: true })
  }
  

   return res.status(200).send(response)
}
export default { insert }
