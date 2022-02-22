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

export const commentSchema = yup.object({
  content: yup.string().trim().max(255).required()
})

export const userSchema = yup.object({
  lastname: yup.string().trim().min(2).max(50),
  firstname: yup.string().trim().min(2).max(50),
  position: yup.string().trim().min(2).max(50)
})

export const passwordSchema = yup.object({
  password: yup.string().required(),
  newPassword: yup.string().min(8).max(25).required()
})

export interface SignupData extends yup.InferType<typeof signupSchema> {}
export interface LoginData extends yup.InferType<typeof loginSchema> {}
export interface PostData extends yup.InferType<typeof postSchema> {}
export interface CommentData extends yup.InferType<typeof commentSchema> {}
export interface ProfileData extends yup.InferType<typeof userSchema> {}
export interface PasswordData extends yup.InferType<typeof passwordSchema> {}
