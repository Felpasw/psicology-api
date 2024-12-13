import report from '../facade/report'
import { Request, Response } from 'express'

const getReport = async (req: Request, res: Response) => {
  const object = req.query
  const method = req.params.method

  if (!report[method]) {
    return res.sendStatus(400)
  }
  const result = await report[method](object)
  if (result) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

export default {
  getReport,
}
