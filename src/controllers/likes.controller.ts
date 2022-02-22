import { NextFunction, Request, Response } from 'express'

import * as likesService from '../services/likes.service'

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { id: userId } = req.currentUser

  try {
    const like = await likesService.likePost(postId, userId)

    res.status(201).json(like)
  } catch (err) {
    next(err)
  }
}

export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { id: userId } = req.currentUser

  try {
    await likesService.unlikePost(postId, userId)

    res.status(200).json('Like supprimé')
  } catch (err) {
    next(err)
  }
}
