import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { hashPassword, verifyPassword } from '../utils/password'
import { PasswordData, ProfileData } from '../utils/validation'

const prisma = new PrismaClient()

export const checkUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) {
    throw new createError.NotFound("Cette utilisateur n'existe pas")
  }

  return user
}

export const getUsers = () => {
  return prisma.user.findMany({
    include: {
      following: true
    }
  })
}

export const editProfile = async (userId: string, { lastname, firstname, position }: ProfileData) => {
  await checkUser(userId)

  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      lastname,
      firstname,
      position
    }
  })
}

export const editPassword = async (userId: string, { password, newPassword }: PasswordData) => {
  const user = await checkUser(userId)

  await verifyPassword(password, user.password)

  const hashedPassword = await hashPassword(newPassword)

  return prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: hashedPassword
    }
  })
}

export const deleteUser = async (userId: string) => {
  await checkUser(userId)

  return prisma.user.delete({
    where: {
      id: userId
    }
  })
}
