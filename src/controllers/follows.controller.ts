import { NextFunction, Request, Response } from 'express'

import * as followsService from '../services/follows.service'

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { userId } = req.params

  try {
    const follow = await followsService.followUser(user.id, userId)

    res.status(201).json(follow)
  } catch (err) {
    next(err)
  }
}

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { userId } = req.params

  try {
    await followsService.unfollowUser(user.id, userId)

    res.status(200).json('Vous ne suivez plus cette personne')
  } catch (err) {
    next(err)
  }
}
