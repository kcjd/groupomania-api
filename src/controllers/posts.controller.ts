import { NextFunction, Request, Response } from 'express'

import * as postsService from '../services/posts.service'
import { PostData } from '../utils/validation'

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postsService.getPosts()

    res.status(200).json({ message: '', posts })
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

    res.status(201).json({ message: 'Publication envoyée', post })
  } catch (err) {
    next(err)
  }
}

export const editPost = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params
  const data: PostData = req.body
  const file = req.file

  try {
    const post = await postsService.editPost(Number(postId), data, file, user.id)

    res.status(200).json({ message: 'Publication modifiée', post })
  } catch (err) {
    next(err)
  }
}

export const hidePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params

  try {
    const post = await postsService.hidePost(Number(postId))

    res.status(200).json({ message: 'Publication masquée', post })
  } catch (err) {
    next(err)
  }
}

export const deletePostMedia = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params

  try {
    const post = await postsService.deletePostMedia(Number(postId), user.id)

    res.status(200).json({ message: 'Image supprimée', post })
  } catch (err) {
    next(err)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { postId } = req.params

  try {
    const post = await postsService.deletePost(Number(postId), user.id)

    res.status(200).json({ message: 'Publication supprimée', post })
  } catch (err) {
    next(err)
  }
}
