import { Router } from 'express'

import { addComment, deleteComment, editComment } from '../controllers/comments.controller'
import validate from '../middleware/validate'
import { commentSchema } from '../utils/validation'

const router = Router({ mergeParams: true })

router.post('/', validate(commentSchema), addComment)
router.patch('/:commentId', validate(commentSchema), editComment)
router.delete('/:commentId', deleteComment)

export default router
