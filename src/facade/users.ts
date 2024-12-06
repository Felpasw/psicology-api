import dbo from '../dbo/base'
import user from '../config/tableModels/user'
import bcrypt from 'bcrypt'
import { userSchema } from '../models/users'
const saltRounds = 10
import * as Yup from 'yup'

const get = async (object) => {
  return await dbo.get(user, object)
}

const insert = async (object) => {
  try {
    await userSchema.validate(object, { abortEarly: false })
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message
        return acc
      }, {})

      return { errors }
    }
  }

  return await dbo.insert(user, object)
}

const update = async (object, id) => {
  return await dbo.update(user, id, object)
}

const remove = async (id) => {
  if (!id) {
    return
  }
  return await dbo.remove(user, id)
}

export { get, insert, update, remove }
