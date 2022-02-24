import { NextFunction, Request, Response } from 'express'
import { unlink } from 'fs/promises'
import { HttpError } from 'http-errors'
import { MulterError } from 'multer'

export default async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    await unlink(req.file.path)
  }

  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json('Le fichier envoyé dépasse la taille maximum autorisée (1 Mo)')
    }
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json(err.message)
  }

  res.status(500).json('Une erreur est survenue')
  next()
}
