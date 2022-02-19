import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { Comment, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { content }: Comment = req.body
  const { id: userId } = req.currentUser

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId
      }
    })

    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params
  const { content }: Comment = req.body

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId }
    })

    if (!comment) throw new createError.NotFound("Ce commentaire n'existe pas")

    const editedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content }
    })

    res.status(200).json(editedComment)
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId
      }
    })

    if (!comment) throw new createError.NotFound("Ce commentaire n'existe pas")

    await prisma.comment.delete({
      where: { id: commentId }
    })

    res.status(200).json({ message: 'Commentaire supprimé' })
  } catch (err) {
    next(err)
  }
}
