import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  username: Yup.string()
    .required('O nome de usuário é obrigatório')
    .typeError('O nome de usuário deve ser um número'),
  email: Yup.string()
    .email('O email deve ser válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .typeError('Senha deve ser um caracter'),
  confirmPassword: Yup.string()
    .required('A confirmação da senha é obrigatória')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
});

export { userSchema };
