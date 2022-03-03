import { Express } from 'express'
import { unlink } from 'fs/promises'
import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { PostData } from '../utils/validation'

const prisma = new PrismaClient()

const getPost = async (postId: number, userId: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  })

  if (!post) {
    throw new createError.NotFound("Cette publication n'existe pas")
  }

  if (post.authorId !== userId) {
    throw new createError.Forbidden('Autorisation requise')
  }

  return post
}

export const getPosts = () => {
  return prisma.post.findMany({
    where: {
      published: true
    },
    include: {
      comments: {
        where: {
          published: true
        }
      },
      likes: true,
      reports: true
    }
  })
}

export const createPost = (data: PostData, file: Express.Multer.File | undefined, authorId: number) => {
  const { content } = data

  return prisma.post.create({
    data: {
      content,
      authorId,
      ...(file && { media: `images/posts/${file.filename}` })
    }
  })
}

export const editPost = async (
  postId: number,
  data: PostData,
  file: Express.Multer.File | undefined,
  userId: number
) => {
  const { content } = data

  const post = await getPost(postId, userId)

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

export const hidePost = (postId: number) => {
  return prisma.post.update({
    where: {
      id: postId
    },
    data: {
      published: false
    }
  })
}

export const deletePostMedia = async (postId: number, userId: number) => {
  const post = await getPost(postId, userId)

  if (!post.media) {
    throw new createError.NotFound("Cette publication ne contient pas d'image")
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      media: null
    }
  })

  await unlink(`public/${post.media}`)

  return updatedPost
}

export const deletePost = async (postId: number, userId: number) => {
  const post = await getPost(postId, userId)

  const deletedPost = await prisma.post.delete({
    where: {
      id: postId
    }
  })

  if (post.media) {
    await unlink(`public/${post.media}`)
  }

  return deletedPost
}
