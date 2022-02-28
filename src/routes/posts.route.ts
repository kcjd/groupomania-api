import { Router } from 'express'

import {
  addPost, deletePost, deletePostMedia, editPost, getPosts, hidePost
} from '../controllers/posts.controller'
import restrict from '../middleware/restrict'
import upload from '../middleware/upload'
import validate from '../middleware/validate'
import { postSchema } from '../utils/validation'
import commentsRoute from './comments.route'
import likesRoute from './likes.route'
import reportsRoute from './reports.route'

const router = Router()

router.get('/', getPosts)
router.post('/', upload('posts').single('media'), validate(postSchema), addPost)
router.patch('/:postId', upload('posts').single('media'), validate(postSchema), editPost)
router.delete('/:postId/media', deletePostMedia)
router.delete('/:postId', deletePost)

router.patch('/:postId/hide', restrict('MODERATOR'), hidePost)

router.use('/:postId/comments', commentsRoute)
router.use('/:postId/likes', likesRoute)
router.use('/:postId/reports', reportsRoute)

export default router
