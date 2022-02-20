import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { PrismaClient, User } from '@prisma/client'

import { hashPassword, verifyPassword } from '../utils/password'

interface PasswordBody {
  password: string
  newPassword: string
}

const prisma = new PrismaClient()

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

export const editProfile = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  const { lastname, firstname, position }: User = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) throw new createError.NotFound("Cet utilisateur n'existe pas")

    const editedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        lastname,
        firstname,
        position
      }
    })

    res.status(200).json(editedUser)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const editPassword = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  const { password, newPassword }: PasswordBody = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) throw new createError.NotFound("Cet utilisateur n'existe pas")

    await verifyPassword(password, user.password)

    const hashedPassword = await hashPassword(newPassword)

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword
      }
    })

    res.status(200).json('Mot de passe modifié')
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId

  try {
    await prisma.user.delete({
      where: { id: userId }
    })

    res.status(200).json({ message: 'Utilisateur supprimé' })
  } catch (err) {
    next(err)
  }
}
