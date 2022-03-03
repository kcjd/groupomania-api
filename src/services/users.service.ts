import { Express } from 'express'
import { unlink } from 'fs/promises'
import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { checkUserId, getUserWithoutPassword } from '../utils/helpers'
import { hashPassword, verifyPassword } from '../utils/password'
import { PasswordData, ProfileData } from '../utils/validation'

const prisma = new PrismaClient()

const getUser = async (userId: number, authUserId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) {
    throw new createError.NotFound("Cet utilisateur n'existe pas")
  }

  checkUserId(userId, authUserId)

  return user
}

export const getUsers = async () => {
  const users = await prisma.user.findMany({
    include: {
      following: true
    }
  })

  return users.map((user) => getUserWithoutPassword(user))
}

export const editProfile = async (
  userId: number,
  data: ProfileData,
  file: Express.Multer.File | undefined,
  authUserId: number
) => {
  const { lastname, firstname, position } = data

  const user = await getUser(userId, authUserId)

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

  return getUserWithoutPassword(updatedUser)
}

export const editPassword = async (userId: number, data: PasswordData, authUserId: number) => {
  const { password, newPassword } = data

  const user = await getUser(userId, authUserId)

  await verifyPassword(password, user.password)

  const hashedPassword = await hashPassword(newPassword)

  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      password: hashedPassword
    }
  })

  return getUserWithoutPassword(updatedUser)
}

export const deleteUserPicture = async (userId: number, authUserId: number) => {
  const user = await getUser(userId, authUserId)

  if (!user.picture) {
    throw new createError.NotFound('Cet utilisateur ne possède pas de photo de profil')
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      picture: null
    }
  })

  await unlink(`public/${user.picture}`)

  return getUserWithoutPassword(updatedUser)
}

export const deleteUser = async (userId: number, authUserId: number) => {
  const user = await getUser(userId, authUserId)

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId
    }
  })

  if (user.picture) {
    await unlink(`public/${user.picture}`)
  }

  return getUserWithoutPassword(deletedUser)
}
