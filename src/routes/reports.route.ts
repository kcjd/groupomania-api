import { Router } from 'express'

import { addReport } from '../controllers/reports.controller'

const router = Router({ mergeParams: true })

router.post('/reports', addReport)

export default router
