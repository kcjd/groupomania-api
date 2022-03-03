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
  lastname: yup.string().max(30).required(),
  firstname: yup.string().max(30).required(),
  email: yup.string().email().max(255).required(),
  password: yup.string().min(8).max(20).required()
})

export const loginSchema = yup.object({
  password: yup.string().required(),
  email: yup.string().required()
})

export const postSchema = yup.object({
  content: yup.string().trim().max(255).required()
})

export const commentSchema = yup.object({
  content: yup.string().trim().max(255).required()
})

export const userSchema = yup.object({
  lastname: yup.string().max(30),
  firstname: yup.string().max(30),
  position: yup.string().max(30)
})

export const passwordSchema = yup.object({
  password: yup.string().required(),
  newPassword: yup.string().min(8).max(20).required()
})

export type SignupData = yup.InferType<typeof signupSchema>
export type LoginData = yup.InferType<typeof loginSchema>
export type PostData = yup.InferType<typeof postSchema>
export type CommentData = yup.InferType<typeof commentSchema>
export type ProfileData = yup.InferType<typeof userSchema>
export type PasswordData = yup.InferType<typeof passwordSchema>
