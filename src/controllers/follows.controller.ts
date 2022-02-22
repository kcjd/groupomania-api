import { NextFunction, Request, Response } from 'express'

import * as followsService from '../services/follows.service'

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId: followingId } = req.params
  const { id: followerId } = req.currentUser

  try {
    const follow = await followsService.followUser(followerId, followingId)

    res.status(201).json(follow)
  } catch (err) {
    next(err)
  }
}

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId: followingId } = req.params
  const { id: followerId } = req.currentUser

  try {
    await followsService.unfollowUser(followerId, followingId)

    res.status(200).json('Vous ne suivez plus cette personne')
  } catch (err) {
    next(err)
  }
}
