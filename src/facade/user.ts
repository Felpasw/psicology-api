import dbo from '../dbo/base'
import user from '../config/tableModels/user'
import bcrypt from 'bcrypt'
const saltRounds = 10

const get = async (object) => {
  return await dbo.get(user, object)
}

const insert = async (object) => {
  return await dbo.insert(user, object)
}

const update = async (object, id) => {
  return await dbo.update(user, id, object)
}

const remove = async (id) => {
  return await dbo.remove(user, id)
}

export { get, insert, update, remove }
