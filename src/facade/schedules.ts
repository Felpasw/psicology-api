import dbo from '../dbo/base'
import schedule from '../config/tableModels/schedule'
import * as Yup from 'yup'
import { scheduleSchema } from '../models/schedule'
import PatientModel from '../config/tableModels/patients'

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

    const { patient } = object

    const response = await dbo.get(PatientModel, { _id: patient })

    if (!response) {
      return { errors: { patient: 'Usuário de criação inválido.' } }
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
  if (!id) {
    return
  }

  return await dbo.remove(schedule, id)
}

export { get, insert, update, remove }
