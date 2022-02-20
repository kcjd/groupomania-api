import { Router } from 'express'

import { likePost, unlikePost } from '../controllers/likes.controller'

const router = Router({ mergeParams: true })

router.post('/', likePost)
router.delete('/', unlikePost)

export default router
