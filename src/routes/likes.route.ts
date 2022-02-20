import { Router } from 'express'

import { addLike, deleteLike } from '../controllers/likes.controller'

const router = Router({ mergeParams: true })

router.post('/likes', addLike)
router.delete('/likes', deleteLike)

export default router
