import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const followUser = async (followerId: number, followingId: number) => {
  if (followerId === followingId) {
    throw new createError.BadRequest('Vous ne pouvez pas vous abonner à vous-même')
  }

  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId
      }
    }
  })

  if (existingFollow) {
    throw new createError.BadRequest('Vous êtes déjà abonné à cet utilisateur')
  }

  return prisma.follow.create({
    data: {
      followerId,
      followingId
    },
    select: {
      followerId: true,
      followingId: true,
      following: true
    }
  })
}

export const unfollowUser = async (followerId: number, followingId: number) => {
  const existingFollow = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId
      }
    }
  })

  if (!existingFollow) {
    throw new createError.NotFound("Vous n'êtes pas abonné à cet utilisateur")
  }

  return prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId,
        followingId
      }
    },
    select: {
      followerId: true,
      followingId: true,
      following: true
    }
  })
}
