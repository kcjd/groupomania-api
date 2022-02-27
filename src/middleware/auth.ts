import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { verifyToken } from '../utils/token'

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return next(new createError.Unauthorized('Authentification requise'))
    }

    req.user = verifyToken(token)

    next()
  } catch (err) {
    next(err)
  }
}
