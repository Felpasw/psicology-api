import dbo from '../dbo/base'
import schedule from '../config/tableModels/schedule'
import * as Yup from 'yup'
import { scheduleSchema } from '../models/schedule'
import UserModel from '../config/tableModels/user'

const get = async (object) => {
  const { date } = object

  if (date && (date.day || date.month)) {
    return await dbo.filterByMonthOrDay(schedule, 'date', date)
  }

  return await dbo.get(schedule, object)
}

const insert = async (object) => {
  try {
    await scheduleSchema.validate(object, { abortEarly: false })
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message
        return acc
      }, {})

      return { errors }
    }

    const { createdBy } = object
    const response = await dbo.get(UserModel, { _id: createdBy })

    if (!response) {
      return { errors: { createdBy: 'Usuário de criação inválido.' } }
    }
  }

  return await dbo.insert(schedule, object)
}
const update = async (object, id: string) => {
  try {
    await scheduleSchema.validate(object, { abortEarly: false })
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message
        return acc
      }, {})

      return { errors }
    }
  }

  return await dbo.update(schedule, id, object)
}

const remove = async (id) => {
  return await dbo.remove(schedule, id)
}

export { get, insert, update, remove }
