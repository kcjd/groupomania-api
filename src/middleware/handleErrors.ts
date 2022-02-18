import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json(err.message)
  }

  res.status(500).json('Une erreur est survenue')
  next()
}
