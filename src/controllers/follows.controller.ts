import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId: followingId } = req.params
  const { id: followerId } = req.currentUser

  try {
    const follow = await prisma.follow.create({
      data: {
        followerId,
        followingId
      }
    })

    res.status(201).json(follow)
  } catch (err) {
    next(err)
  }
}

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId: followingId } = req.params
  const { id: followerId } = req.currentUser

  try {
    const follow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } }
    })

    if (!follow) throw new createError.NotFound('Vous ne suivez pas cet utilisateur')

    await prisma.follow.delete({
      where: { followerId_followingId: { followerId, followingId } }
    })

    res.status(200).json('Vous ne suivez plus cette personne')
  } catch (err) {
    next(err)
  }
}
