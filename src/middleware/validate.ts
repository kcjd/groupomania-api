import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import ObjectSchema from 'yup/lib/object'

export default (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body)
    next()
  } catch (err) {
    if (err instanceof Error) {
      next(new createError.BadRequest(err.message))
    }
  }
}
