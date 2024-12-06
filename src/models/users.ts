import * as Yup from 'yup'

const userSchema = Yup.object().shape({
  username: Yup.string().required('O nome de usuário é obrigatório').typeError('O nome de usuário deve ser um número'),
  email: Yup.string().required('O email é obrigatório').typeError('O email ser um caracter'),
  password: Yup.string().required('A senha é obrigatória ').typeError('Senha deve ser um caracter'),
  confirmPassword: Yup.string()
    .required('A senha é obrigatória')
    .typeError('Confirmação da senha deve ser um caracter'),
})

export { userSchema }
