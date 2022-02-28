import { Express } from 'express'
import { unlink } from 'fs/promises'
import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { hashPassword, verifyPassword } from '../utils/password'
import { PasswordData, ProfileData } from '../utils/validation'

const prisma = new PrismaClient()

export const getUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) {
    throw new createError.NotFound("Cet utilisateur n'existe pas")
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

export const editProfile = async (
  userId: number,
  { lastname, firstname, position }: ProfileData,
  file: Express.Multer.File | undefined
) => {
  const user = await getUser(userId)

  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      lastname,
      firstname,
      position,
      ...(file && { picture: `images/users/${file.filename}` })
    }
  })

  if (file && user.picture) {
    await unlink(`public/${user.picture}`)
  }

  return updatedUser
}

export const editPassword = async (userId: number, { password, newPassword }: PasswordData) => {
  const user = await getUser(userId)

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

export const deleteUserPicture = async (userId: number) => {
  const user = await getUser(userId)

  if (!user.picture) {
    throw new createError.NotFound('Cet utilisateur ne possède pas de photo de profil')
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      picture: null
    }
  })

  await unlink(`public/${user.picture}`)
}

export const deleteUser = async (userId: number) => {
  const user = await getUser(userId)

  await prisma.user.delete({
    where: {
      id: userId
    }
  })

  if (user.picture) {
    await unlink(`public/${user.picture}`)
  }
}
