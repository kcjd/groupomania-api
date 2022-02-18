import jwt from 'jsonwebtoken'

import { User } from '@prisma/client'

export const createToken = (user: User) => {
  return jwt.sign(user, process.env.TOKEN_SECRET ?? '', { expiresIn: '72h' })
}

export const verifyToken = (authHeader: string) => {
  const token = authHeader.split(' ')[1]
  return jwt.verify(token, process.env.TOKEN_SECRET ?? '') as User
}
