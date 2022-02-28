import { Router } from 'express'

import {
  addComment, deleteComment, editComment, hideComment
} from '../controllers/comments.controller'
import restrict from '../middleware/restrict'
import validate from '../middleware/validate'
import { commentSchema } from '../utils/validation'

const router = Router({ mergeParams: true })

router.post('/', validate(commentSchema), addComment)
router.patch('/:commentId', validate(commentSchema), editComment)
router.delete('/:commentId', deleteComment)

router.patch('/:commentId/hide', restrict('MODERATOR'), hideComment)

export default router
