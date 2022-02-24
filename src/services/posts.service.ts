import { Express } from 'express'
import { unlink } from 'fs/promises'
import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { PostData } from '../utils/validation'

const prisma = new PrismaClient()

export const checkPost = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  })

  if (!post) {
    throw new createError.NotFound("Cette publication n'existe pas")
  }

  return post
}

export const getPosts = () => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      comments: true,
      likes: true,
      reports: true
    }
  })
}

export const createPost = ({ content }: PostData, file: Express.Multer.File | undefined, authorId: string) => {
  return prisma.post.create({
    data: {
      content,
      authorId,
      ...(file && { media: `images/posts/${file.filename}` })
    }
  })
}

export const editPost = async (postId: string, { content }: PostData, file: Express.Multer.File | undefined) => {
  const post = await checkPost(postId)

  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      content,
      ...(file && { media: `images/posts/${file.filename}` })
    }
  })

  if (file && post.media) {
    await unlink(`public/${post.media}`)
  }

  return updatedPost
}

export const deletePostMedia = async (postId: string) => {
  const post = await checkPost(postId)

  if (!post.media) {
    throw new createError.NotFound("Cette publication ne contient pas d'image")
  }

  await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      media: null
    }
  })

  await unlink(`public/${post.media}`)
}

export const deletePost = async (postId: string) => {
  const post = await checkPost(postId)

  await prisma.post.delete({
    where: {
      id: postId
    }
  })

  if (post.media) {
    await unlink(`public/${post.media}`)
  }
}