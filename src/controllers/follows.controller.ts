import { NextFunction, Request, Response } from 'express'

import * as followsService from '../services/follows.service'

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { userId } = req.params

  try {
    const follow = await followsService.followUser(user.id, Number(userId))

    res.status(201).json(follow)
  } catch (err) {
    next(err)
  }
}

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { userId } = req.params

  try {
    const unfollow = await followsService.unfollowUser(user.id, Number(userId))

    res.status(200).json(unfollow)
  } catch (err) {
    next(err)
  }
}
