import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const likePost = async (postId: string, userId: string) => {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId
      }
    }
  })

  if (existingLike) {
    throw new createError.BadRequest('Vous aimez déjà cette publication')
  }

  return prisma.like.create({
    data: {
      postId,
      userId
    }
  })
}

export const unlikePost = async (postId: string, userId: string) => {
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId,
        postId
      }
    }
  })

  if (!existingLike) {
    throw new createError.NotFound("Vous n'aimez pas cette publication")
  }

  return prisma.like.delete({
    where: {
      userId_postId: {
        postId,
        userId
      }
    }
  })
}
