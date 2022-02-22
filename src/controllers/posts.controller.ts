import { NextFunction, Request, Response } from 'express'

import * as postsService from '../services/posts.service'
import { PostData } from '../utils/validation'

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postsService.getPosts()

    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const { id: userId } = req.currentUser
  const data: PostData = req.body

  try {
    const post = await postsService.createPost(data, userId)

    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export const editPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const data: PostData = req.body

  try {
    const post = await postsService.editPost(postId, data)

    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params

  try {
    await postsService.deletePost(postId)

    res.status(200).json({ message: 'Publication supprimée' })
  } catch (err) {
    next(err)
  }
}
