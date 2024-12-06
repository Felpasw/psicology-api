import * as Yup from 'yup'

interface IPatient extends Document {
  name: string
  CPF: string
  age: number
  gender: 'M' | 'F' | 'O'
  phoneNumber?: string
  email?: string
  address?: string
  medicalHistory?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

const userSchema = Yup.object().shape({
  name: Yup.string().required('O nome do paciente é obrigatório').typeError('O nome de usuário deve ser um número'),
  CPF: Yup.string().required('O CPF do paciente é obrigatório').typeError('O nome de usuário deve ser um número'),
  age: Yup.number()
    .required('A idade do paciente é obrigatória')
    .typeError('O email ser um caracter')
    .typeError('Idade deve ser um número'),
  gender: Yup.string().required('O gênero do paciente é obrigatório').typeError('Gênero deve ser uma string'),
  email: Yup.string().required('O email é obrigatório').typeError('O email ser um caracter'),
  address: Yup.string().typeError('Endereço deve ser um caracter'),
  password: Yup.string().required('A senha é obrigatória ').typeError('Senha deve ser um caracter'),
  confirmPassword: Yup.string()
    .required('A senha é obrigatória')
    .typeError('Confirmação da senha deve ser um caracter'),
})

export { userSchema }
