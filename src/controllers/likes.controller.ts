import { NextFunction, Request, Response } from 'express'

import * as likesService from '../services/likes.service'

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params

  try {
    const like = await likesService.likePost(Number(postId), user.id)

    res.status(201).json({ message: '', like })
  } catch (err) {
    next(err)
  }
}

export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params

  try {
    const like = await likesService.unlikePost(Number(postId), user.id)

    res.status(200).json({ message: '', like })
  } catch (err) {
    next(err)
  }
}
