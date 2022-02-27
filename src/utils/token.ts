import createError from 'http-errors'
import jwt from 'jsonwebtoken'

import { User } from '@prisma/client'

export const createToken = (user: User) => {
  return jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: '72h' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET as string) as User
  } catch (err) {
    throw new createError.Unauthorized("L'authentification a échoué")
  }
}
