import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import multer, { diskStorage } from 'multer'
import path from 'path'

const allowedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const maxFileSize = 1024 * 1024

export default (dir: string) => (req: Request, res: Response, next: NextFunction) => {
  return multer({
    storage: diskStorage({
      destination: `public/images/${dir}`,
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!allowedFormats.includes(file.mimetype)) {
        return cb(new createError.BadRequest("Ce format de fichier n'est pas accepté"))
      }

      cb(null, true)
    },
    limits: {
      fileSize: maxFileSize
    }
  }).single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        next(new createError.BadRequest('Fichier trop lourd (max. 1 Mo)'))
      }
    }

    next()
  })
}
