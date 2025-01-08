import dbo from '../dbo/base'
import schedule from '../config/tableModels/schedule'
import * as Yup from 'yup'
import { scheduleSchema } from '../models/schedule'
import PatientModel from '../config/tableModels/patients'
import mongoose from 'mongoose'

interface schedule {
  title: string
  description?: string
  date: Date
  startTime: string
  endTime: string
  location?: string
  status: 'confirmed' | 'pending' | 'cancelled'
  patient: mongoose.Schema.Types.ObjectId
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}


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
  }

  const { patient, date, startTime, endTime } = object

  const response = await dbo.get(PatientModel, { _id: patient })

  if (!response) {
    return { errors: { patient: 'Paciente inválido.' } }
  }

  const responseSchedule = await dbo.get(schedule, { date });

  if (responseSchedule) {
    const hasConflict = responseSchedule.some((item: schedule) => {
      const itemStart = new Date(`1970-01-01T${item.startTime}:00`);
      const itemEnd = new Date(`1970-01-01T${item.endTime}:00`);
      const newStart = new Date(`1970-01-01T${startTime}:00`);
      const newEnd = new Date(`1970-01-01T${endTime}:00`);

      return (
        (newStart < itemEnd && newStart >= itemStart) ||
        (newEnd > itemStart && newEnd <= itemEnd) ||
        (newStart <= itemStart && newEnd >= itemEnd)
      );
    });

    if (hasConflict) {
      return {
        errors: {
          date: 'Horário de consulta inválido! Outra consulta já foi marcada no intervalo informado!',
        },
      };
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

  const { patient } = object

  const response = await dbo.get(PatientModel, { _id: patient })

  if (!response) {
    return { errors: { patient: 'Paciente inválido.' } }
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
