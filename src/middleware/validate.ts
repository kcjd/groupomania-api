import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import { ObjectSchema, ValidationError } from 'yup'

export default (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body)
    next()
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new createError.BadRequest(err.message))
    }
  }
}
