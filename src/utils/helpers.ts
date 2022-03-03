import createError from 'http-errors'

import { User } from '@prisma/client'

export const getUserWithoutPassword = (user: User) => {
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export const checkUserId = (userId1: number, userId2: number) => {
  if (userId1 !== userId2) {
    throw new createError.Forbidden('Autorisation requise')
  }
}
