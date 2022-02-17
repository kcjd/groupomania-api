import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'

export default (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'Une erreur est survenue'

  res.status(status).send(message)
  next()
}
