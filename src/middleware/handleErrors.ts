import { NextFunction, Request, Response } from 'express'
import { unlink } from 'fs/promises'
import { HttpError } from 'http-errors'

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    await unlink(req.file.path)
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message })
  }

  res.status(500).json({ error: 'Une erreur est survenue' })
  next()
}
