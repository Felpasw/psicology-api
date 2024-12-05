import { Request, Response } from 'express'
import UserModel from '../config/tableModels/user'
import dbo from '../dbo/base'
import bcrypt from 'bcrypt'

const insert = async (req: Request, res: Response) => {
  const { password, confirmPassword, _id } = req.body

  if (password != confirmPassword) {
    return res.status(400).json({ password: 'Credenciais não conferem', confirmPassword: 'Credenciais não conferem' })
  }
  const response = await dbo.get(UserModel, { _id })
  if (!response) {
    return res.status(404).json({ _id: 'Usuário não encontrado' })
  }
  await dbo.update(UserModel, _id, { password: await bcrypt.hash(password, 10) })
  return res.sendStatus(200)
}

export default {
  insert,
}
