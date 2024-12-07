import * as Yup from 'yup'



const patientSchema = Yup.object().shape({
  name: Yup.string().required('O nome do paciente é obrigatório').typeError('O nome de paciente deve ser um número'),
  CPF: Yup.string().required('O CPF do paciente é obrigatório').typeError('O CPF de paciente deve ser um caracter'),
  age: Yup.number()
    .required('A idade do paciente é obrigatória')
    .typeError('A idade deve ser um número')
    .typeError('Idade deve ser um número'),
  gender: Yup.string()
    .required('O gênero do paciente é obrigatório')
    .oneOf(['F', 'M', 'O'], 'Gênero deve ser "F", "M" ou "O"')
    .typeError('Gênero deve ser uma string'),
  email: Yup.string().required('O email é obrigatório').typeError('O email deve ser um caracter'),
  address: Yup.string().typeError('Endereço deve ser um caracter'),
  phoneNumber: Yup.string().typeError('Número de telefone deve ser uma string1')

})

export { patientSchema }
