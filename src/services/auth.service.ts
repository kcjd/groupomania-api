import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { hashPassword, verifyPassword } from '../utils/password'
import { createToken } from '../utils/token'
import { LoginData, SignupData } from '../utils/validation'

const prisma = new PrismaClient()

export const signup = async ({ lastname, firstname, email, password }: SignupData) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser) {
    throw new createError.BadRequest('Cet utilisateur existe déjà')
  }

  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      lastname,
      firstname,
      email,
      password: hashedPassword
    }
  })

  const accessToken = createToken(user)

  return { user, accessToken }
}

export const login = async ({ email, password }: LoginData) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    throw new createError.Unauthorized("Cet utilisateur n'existe pas")
  }

  await verifyPassword(password, user.password)

  const accessToken = createToken(user)

  return { user, accessToken }
}
