import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { PrismaClient, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { createToken } from '../utils/token'

const prisma = new PrismaClient()

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const userData: User = req.body

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    const user = await prisma.user.create({
      data: { ...userData, password: hashedPassword }
    })

    const accessToken = createToken(user)

    res.status(200).json({ user, accessToken })
  } catch (err) {
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const userData: User = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    if (!user) throw new createError.Unauthorized("Cet utilisateur n'existe pas")

    const isValidPassword = await bcrypt.compare(userData.password, user.password)
    if (!isValidPassword) throw new createError.Unauthorized('Le mot de passe est erroné')

    const accessToken = createToken(user)

    res.status(200).json({ user, accessToken })
  } catch (err) {
    next(err)
  }
}
