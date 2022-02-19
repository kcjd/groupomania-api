import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { PrismaClient, User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

import { hashPassword, verifyPassword } from '../utils/password'
import { createToken } from '../utils/token'

const prisma = new PrismaClient()

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { lastname, firstname, email, password }: User = req.body

  try {
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

    res.status(200).json({ user, accessToken })
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        next(new createError.BadRequest('Cet utilisateur existe déjà'))
      }
    }
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: User = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) throw new createError.Unauthorized("Cet utilisateur n'existe pas")

    await verifyPassword(password, user.password)

    const accessToken = createToken(user)

    res.status(200).json({ user, accessToken })
  } catch (err) {
    next(err)
  }
}
