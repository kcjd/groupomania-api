import { Router } from 'express'

import {
  deleteUser, deleteUserPicture, editPassword, editProfile, getUsers
} from '../controllers/users.controller'
import upload from '../middleware/upload'
import validate from '../middleware/validate'
import { passwordSchema, userSchema } from '../utils/validation'
import followsRoute from './follows.route'

const router = Router()

router.get('/', getUsers)
router.patch('/:userId', upload('users'), validate(userSchema), editProfile)
router.patch('/:userId/password', validate(passwordSchema), editPassword)
router.delete('/:userId/picture', deleteUserPicture)
router.delete('/:userId', deleteUser)

router.use('/:userId/follows', followsRoute)

export default router
