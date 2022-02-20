import { NextFunction, Request, Response } from 'express'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const addReport = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { id: userId } = req.currentUser

  try {
    const report = await prisma.report.create({
      data: {
        postId,
        userId
      }
    })

    res.status(201).json(report)
  } catch (err) {
    next(err)
  }
}
