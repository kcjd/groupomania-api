import { NextFunction, Request, Response } from 'express'

import * as likesService from '../services/likes.service'

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params

  try {
    const like = await likesService.likePost(postId, user.id)

    res.status(201).json(like)
  } catch (err) {
    next(err)
  }
}

export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params

  try {
    await likesService.unlikePost(postId, user.id)

    res.status(200).json('Like supprimé')
  } catch (err) {
    next(err)
  }
}
