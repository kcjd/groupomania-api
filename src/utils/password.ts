import bcrypt from 'bcrypt'
import createError from 'http-errors'

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const verifyPassword = async (password1: string, password2: string) => {
  const isValidPassword = await bcrypt.compare(password1, password2)
  if (!isValidPassword) throw new createError.Unauthorized('Le mot de passe est erroné')
}
