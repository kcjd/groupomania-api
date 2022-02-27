import createError from 'http-errors'

import { PrismaClient } from '@prisma/client'

import { CommentData } from '../utils/validation'

const prisma = new PrismaClient()

export const getComment = async (commentId: string) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId
    }
  })

  if (!comment) {
    throw new createError.NotFound("Ce commentaire n'existe pas")
  }

  return comment
}

export const createComment = ({ content }: CommentData, postId: string, authorId: string) => {
  return prisma.comment.create({
    data: {
      content,
      postId,
      authorId
    }
  })
}

export const editComment = async (commentId: string, { content }: CommentData) => {
  await getComment(commentId)

  return prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      content
    }
  })
}

export const deleteComment = async (commentId: string) => {
  await getComment(commentId)

  return prisma.comment.delete({
    where: {
      id: commentId
    }
  })
}
