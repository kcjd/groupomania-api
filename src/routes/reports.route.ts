import { Router } from 'express'

import { reportPost } from '../controllers/reports.controller'

const router = Router({ mergeParams: true })

router.post('/', reportPost)

export default router
