import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  _id: Yup.string().required('Id é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .typeError('Senha deve ser um caracter'),
  confirmPassword: Yup.string()
    .required('Confirmar senha é obrigatório')
    .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais')
    .typeError('Confirmação da senha deve ser um caracter'),
});

export { passwordSchema };
