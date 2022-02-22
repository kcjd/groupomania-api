import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const reportPost = async (postId: string, userId: string) => {
  const existingReport = await prisma.report.findUnique({
    where: {
      userId_postId: {
        userId,
        postId
      }
    }
  })

  if (existingReport) {
    throw new createError.BadRequest('Vous avez déjà signalé cette publication')
  }

  return prisma.report.create({
    data: {
      postId,
      userId
    }
  })
}
