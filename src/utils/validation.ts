import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Le champ ${path} est requis'
  },
  string: {
    min: 'Minimum ${min} caractères',
    email: 'Email non valide'
  }
})

export const signupSchema = yup.object({
  lastname: yup.string().required(),
  firstname: yup.string().required(),
  password: yup.string().min(8).required(),
  email: yup.string().email().required()
})

export const loginSchema = yup.object({
  password: yup.string().required(),
  email: yup.string().required()
})
