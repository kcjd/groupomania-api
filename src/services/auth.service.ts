import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { getUserWithoutPassword } from '../utils/helpers'
import { hashPassword, verifyPassword } from '../utils/password'
import { createToken } from '../utils/token'
import { LoginData, SignupData } from '../utils/validation'

const prisma = new PrismaClient()

export const signup = async (data: SignupData) => {
  const { lastname, firstname, email, password } = data

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

  return { user: getUserWithoutPassword(user), accessToken }
}

export const login = async (data: LoginData) => {
  const { email, password } = data

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    throw new createError.Unauthorized('Email incorrect')
  }

  await verifyPassword(password, user.password)

  const accessToken = createToken(user)

  return { user: getUserWithoutPassword(user), accessToken }
}
