import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: ({ path }) => `Le champ '${path}' est requis`
  },
  string: {
    min: ({ path, min }) => `Le champ '${path}' doit faire minimum ${min} caractères`,
    max: ({ path, max }) => `Le champ '${path}' doit faire maximum ${max} caractères`,
    email: ({ path }) => `Le champ '${path}' doit être un email valide`
  }
})

export const signupSchema = yup.object({
  lastname: yup.string().trim().min(2).max(50).required(),
  firstname: yup.string().trim().min(2).max(50).required(),
  password: yup.string().min(8).max(25).required(),
  email: yup.string().email().required()
})

export const loginSchema = yup.object({
  password: yup.string().required(),
  email: yup.string().required()
})

export const postSchema = yup.object({
  content: yup.string().trim().max(255).required()
})
