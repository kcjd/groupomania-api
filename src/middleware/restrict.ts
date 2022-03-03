import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { Role } from '@prisma/client'

export default (role: Role) => (req: Request, res: Response, next: NextFunction) => {
  const { user } = req

  if (user.role === role) {
    return next()
  }

  next(new createError.Forbidden('Autorisation requise'))
}
