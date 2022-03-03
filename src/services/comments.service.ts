import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { checkUserId } from '../utils/helpers'
import { CommentData } from '../utils/validation'

const prisma = new PrismaClient()

const getComment = async (commentId: number, userId: number) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  })

  if (!comment) {
    throw new createError.NotFound("Ce commentaire n'existe pas")
  }

  checkUserId(comment.authorId, userId)

  return comment
}

export const createComment = (data: CommentData, postId: number, authorId: number) => {
  const { content } = data

  return prisma.comment.create({
    data: {
      content,
      postId,
      authorId
    }
  })
}

export const editComment = async (commentId: number, data: CommentData, userId: number) => {
  const { content } = data

  await getComment(commentId, userId)

  return prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      content
    }
  })
}

export const hideComment = (commentId: number) => {
  return prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      published: false
    }
  })
}

export const deleteComment = async (commentId: number, userId: number) => {
  await getComment(commentId, userId)

  return prisma.comment.delete({
    where: {
      id: commentId
    }
  })
}
