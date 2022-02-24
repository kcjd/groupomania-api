import { NextFunction, Request, Response } from 'express'

import * as usersService from '../services/users.service'
import { PasswordData, ProfileData } from '../utils/validation'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getUsers()

    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

export const editProfile = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  const data: ProfileData = req.body
  const file = req.file

  try {
    const user = await usersService.editProfile(userId, data, file)

    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export const editPassword = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId
  const data: PasswordData = req.body

  try {
    await usersService.editPassword(userId, data)

    res.status(200).json('Mot de passe modifié')
  } catch (err) {
    next(err)
  }
}

export const deleteUserPicture = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params

  try {
    await usersService.deleteUserPicture(userId)

    res.status(200).json('Photo de profil supprimée')
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId

  try {
    await usersService.deleteUser(userId)

    res.status(200).json('Utilisateur supprimé')
  } catch (err) {
    next(err)
  }
}
