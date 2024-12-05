import { Response, Request } from 'express'
import bcrypt from 'bcrypt'
import moment from 'moment'
import UserModel from '../config/tableModels/user'
import dbo from '../dbo/base'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(404).json({ email: 'Credenciais não conferem', password: 'Credenciais não conferem' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ email: 'Credenciais não conferem', password: 'Credenciais não conferem' })
    }

    const expiration = moment().add(1, 'hours').toDate()

    res.cookie('cookieID', user._id, { expires: expiration, httpOnly: true })

    return res.status(200).json({ message: 'Login bem-sucedido', user })
  } catch (error) {
    console.error('Erro no login:', error)
    return res.status(500).json({ message: 'Erro interno do servidor' })
  }
}

export default { login }
