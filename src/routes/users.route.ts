import { Router } from 'express'

import { deleteUser, editPassword, editProfile, getUsers } from '../controllers/users.controller'
import validate from '../middleware/validate'
import { passwordSchema, userSchema } from '../utils/validation'

const router = Router()

router.get('/', getUsers)
router.patch('/:userId', validate(userSchema), editProfile)
router.patch('/:userId/password', validate(passwordSchema), editPassword)
router.delete('/:userId', deleteUser)

export default router
