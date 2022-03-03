import { NextFunction, Request, Response } from 'express'

import * as followsService from '../services/follows.service'

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { userId } = req.params

  try {
    const { following, ...follow } = await followsService.followUser(user.id, Number(userId))

    res.status(201).json({ message: `Vous êtes abonné à ${following.firstname}`, follow })
  } catch (err) {
    next(err)
  }
}

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { userId } = req.params

  try {
    const { following, ...follow } = await followsService.unfollowUser(user.id, Number(userId))

    res.status(200).json({ message: `Vous n'êtes plus abonné à ${following.firstname}`, follow })
  } catch (err) {
    next(err)
  }
}
