import { NextFunction, Request, Response } from 'express'

import * as commentsService from '../services/comments.service'
import { CommentData } from '../utils/validation'

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params
  const data: CommentData = req.body

  try {
    const comment = await commentsService.createComment(data, Number(postId), user.id)

    res.status(201).json({ message: 'Commentaire envoyé', comment })
  } catch (err) {
    next(err)
  }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params
  const data: CommentData = req.body

  try {
    const comment = await commentsService.editComment(Number(commentId), data)

    res.status(200).json({ message: 'Commentaire modifié', comment })
  } catch (err) {
    next(err)
  }
}

export const hideComment = async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params

  try {
    const comment = await commentsService.hideComment(Number(commentId))

    res.status(200).json({ message: 'Commentaire masqué', comment })
  } catch (err) {
    next(err)
  }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  const { commentId } = req.params

  try {
    const comment = await commentsService.deleteComment(Number(commentId))

    res.status(200).json({ message: 'Commentaire supprimé', comment })
  } catch (err) {
    next(err)
  }
}
