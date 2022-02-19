import { Router } from 'express'

import { addComment, deleteComment, editComment } from '../controllers/comments.controller'
import validate from '../middleware/validate'
import { commentSchema } from '../utils/validation'

const router = Router({ mergeParams: true })

router.post('/comments', validate(commentSchema), addComment)
router.patch('/comments/:commentId', validate(commentSchema), editComment)
router.delete('/comments/:commentId', deleteComment)

export default router
