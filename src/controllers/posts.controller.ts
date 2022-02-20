import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

import { Post, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        comments: true,
        likes: true,
        reports: true
      }
    })

    res.status(200).json(posts)
  } catch (err) {
    next(err)
  }
}

export const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const { content }: Post = req.body
  const { id: userId } = req.currentUser

  try {
    const post = await prisma.post.create({
      data: {
        content,
        authorId: userId
      }
    })

    res.status(201).json(post)
  } catch (err) {
    next(err)
  }
}

export const editPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  const { content }: Post = req.body

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) throw new createError.NotFound("Cette publication n'existe pas")

    const editedPost = await prisma.post.update({
      where: { id: postId },
      data: { content }
    })

    res.status(200).json(editedPost)
  } catch (err) {
    next(err)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId }
    })

    if (!post) throw new createError.NotFound("Cette publication n'existe pas")

    await prisma.post.delete({
      where: { id: postId }
    })

    res.status(200).json({ message: 'Publication supprimée' })
  } catch (err) {
    next(err)
  }
}
