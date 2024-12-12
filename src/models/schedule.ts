import * as Yup from 'yup'

const scheduleSchema = Yup.object().shape({
  title: Yup.string().required('O título da consulta é obrigatório').typeError('O título deve ser uma string'),
  description: Yup.string().nullable().typeError('A descrição deve ser uma string'),
  date: Yup.date().required('A data da consulta é obrigatória').typeError('A data deve ser uma data válida'),
  startTime: Yup.string()
    .required('O horário de início é obrigatório')
    .typeError('O horário de início deve ser uma string'),
  endTime: Yup.string()
    .nullable()
    .typeError('O horário de término deve ser uma string')
    .test('is-after-startTime', 'O horário de término deve ser posterior ao horário de início', function (endTime) {
      const { startTime } = this.parent
      if (!endTime || !startTime) return true
      return endTime > startTime
    })
    .test('is-max-4-hours', 'O intervalo entre o início e o término deve ser no máximo de 4 horas', function (endTime) {
      const { startTime } = this.parent
      if (!endTime || !startTime) return true

      const start = new Date(`1970-01-01T${startTime}:00Z`)
      const end = new Date(`1970-01-01T${endTime}:00Z`)

      const intervalInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60)
      return intervalInHours <= 4
    }),
  location: Yup.string().nullable().typeError('O local deve ser uma string'),
  status: Yup.mixed<'confirmed' | 'pending' | 'cancelled' | 'completed'>().oneOf(
    ['confirmed', 'pending', 'cancelled', 'completed'],
    'Status deve ser "confirmed", "pending","cancelled" ou "completed"'
  ),
  patient: Yup.string().required('O paciente é obrigatório').typeError('O ID do criador deve ser uma string válida'),
})

export { scheduleSchema }
