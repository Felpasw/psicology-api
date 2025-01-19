import PatientModel from '../config/tableModels/patients'
import dbo from '../dbo/base'
import { patientSchema } from '../models/patients'
import * as Yup from 'yup'

const get = async (object) => {
  return await dbo.get(PatientModel, object)
}

const insert = async (object) => {

  if (object.files) {
    object.profileImage = object.files[0].filename
  }

  try {
    await patientSchema.validate(object, { abortEarly: false })
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message
        return acc
      }, {})

      return { errors }
    }
  }

  return await dbo.insert(PatientModel, object)
}

const update = async (object, id) => {
  if (!id) {
    return
  }
  try {
    await patientSchema.validate(object, { abortEarly: false })
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce((acc, err) => {
        acc[err.path] = err.message
        return acc
      }, {})

      return { errors }
    }
  }

  return await dbo.update(PatientModel, id, object)
}

const remove = async (id) => {
  if (!id) {
    return
  }
  console.log(id)

  return await dbo.remove(PatientModel, id)
}

export { get, insert, update, remove }
