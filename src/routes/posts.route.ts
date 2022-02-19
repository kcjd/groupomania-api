import { Router } from 'express'

import { addPost, deletePost, editPost, getPosts } from '../controllers/posts.controller'
import validate from '../middleware/validate'
import { postSchema } from '../utils/validation'
import commentsRoute from './comments.route'

const router = Router()

router.get('/', getPosts)
router.post('/', validate(postSchema), addPost)
router.patch('/:postId', validate(postSchema), editPost)
router.delete('/:postId', deletePost)

router.use('/:postId', commentsRoute)

export default router
