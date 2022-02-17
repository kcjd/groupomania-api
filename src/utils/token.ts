import jwt from 'jsonwebtoken'

import { User } from '@prisma/client'

export const createToken = (user: User) => {
  return jwt.sign({ id: user.id }, process.env.TOKEN_SECRET ?? '', { expiresIn: '24h' })
}
