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

export const createPost = ({ content }: PostData, authorId: string) => {
  return prisma.post.create({
    data: {
      content,
      authorId
    }
  })
}

export const editPost = async (postId: string, { content }: PostData) => {
  await checkPost(postId)

  return prisma.post.update({
    where: {
      id: postId
    },
    data: {
      content
    }
  })
}

export const deletePost = async (postId: string) => {
  await checkPost(postId)

  return prisma.post.delete({
    where: {
      id: postId
    }
  })
}
