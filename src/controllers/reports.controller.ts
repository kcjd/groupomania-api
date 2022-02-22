import { NextFunction, Request, Response } from 'express'

import * as reportsService from '../services/reports.service'

export const reportPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { id: userId } = req.currentUser

  try {
    const report = await reportsService.reportPost(postId, userId)

    res.status(201).json(report)
  } catch (err) {
    next(err)
  }
}
