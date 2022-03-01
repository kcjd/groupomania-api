import { NextFunction, Request, Response } from 'express'

import * as reportsService from '../services/reports.service'

export const reportPost = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params

  try {
    const report = await reportsService.reportPost(Number(postId), user.id)

    res.status(201).json({ message: 'Publication signalée', report })
  } catch (err) {
    next(err)
  }
}
