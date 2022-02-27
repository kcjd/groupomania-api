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
  const { user } = req
  const data: PostData = req.body
  const file = req.file

  try {
    const post = await postsService.createPost(data, file, user.id)

    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export const editPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const data: PostData = req.body
  const file = req.file

  try {
    const post = await postsService.editPost(postId, data, file)

    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

export const deletePostMedia = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params

  try {
    await postsService.deletePostMedia(postId)

    res.status(200).json('Image supprimée')
  } catch (err) {
    next(err)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params

  try {
    await postsService.deletePost(postId)

    res.status(200).json('Publication supprimée')
  } catch (err) {
    next(err)
  }
}
