import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { verifyToken } from '../utils/token'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization

    const decodedToken = verifyToken(authHeader ?? '')

    req.currentUser = decodedToken

    next()
  } catch (err) {
    next(new createError.Unauthorized())
  }
}
