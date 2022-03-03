import { NextFunction, Request, Response } from 'express'

import * as usersService from '../services/users.service'
import { PasswordData, ProfileData } from '../utils/validation'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getUsers()

    res.status(200).json({ message: '', users })
  } catch (err) {
    next(err)
  }
}

export const editProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { user: authUser } = req
  const userId = req.params.userId
  const data: ProfileData = req.body
  const file = req.file

  try {
    const user = await usersService.editProfile(Number(userId), data, file, authUser.id)

    res.status(200).json({ message: 'Profil mis à jour', user })
  } catch (err) {
    next(err)
  }
}

export const editPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { user: authUser } = req
  const userId = req.params.userId
  const data: PasswordData = req.body

  try {
    const user = await usersService.editPassword(Number(userId), data, authUser.id)

    res.status(200).json({ message: 'Mot de passe modifié', user })
  } catch (err) {
    next(err)
  }
}

export const deleteUserPicture = async (req: Request, res: Response, next: NextFunction) => {
  const { user: authUser } = req
  const { userId } = req.params

  try {
    const user = await usersService.deleteUserPicture(Number(userId), authUser.id)

    res.status(200).json({ message: 'Photo de profil supprimée', user })
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { user: authUser } = req
  const userId = req.params.userId

  try {
    const user = await usersService.deleteUser(Number(userId), authUser.id)

    res.status(200).json({ message: 'Compte supprimé', user })
  } catch (err) {
    next(err)
  }
}
