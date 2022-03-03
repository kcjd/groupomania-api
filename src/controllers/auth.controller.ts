import { NextFunction, Request, Response } from 'express'

import * as authService from '../services/auth.service'
import { LoginData, SignupData } from '../utils/validation'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const data: SignupData = req.body

  try {
    const credentials = await authService.signup(data)

    res.status(200).json({
      message: `Compte créé: ${credentials.user.email}`,
      ...credentials
    })
  } catch (err) {
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const data: LoginData = req.body

  try {
    const credentials = await authService.login(data)

    res.status(200).json({
      message: `Connecté : ${credentials.user.email}`,
      ...credentials
    })
  } catch (err) {
    next(err)
  }
}
