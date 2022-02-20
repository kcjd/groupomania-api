import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { id: userId } = req.currentUser

  try {
    const like = await prisma.like.create({
      data: {
        postId,
        userId
      }
    })

    res.status(201).json(like)
  } catch (err) {
    next(err)
  }
}

export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { id: userId } = req.currentUser

  try {
    const like = await prisma.like.findUnique({
      where: { userId_postId: { postId, userId } }
    })

    if (!like) throw new createError.NotFound("Ce like n'existe pas")

    await prisma.like.delete({
      where: { userId_postId: { postId, userId } }
    })

    res.status(200).json('Like supprimé')
  } catch (err) {
    next(err)
  }
}
