
import { Request, Response } from "express"

const insert = async (req: Request, res: Response) => {
    res.clearCookie("cookieID")
    return res.sendStatus(200)
  }
  
  export default  {
    insert,
  }