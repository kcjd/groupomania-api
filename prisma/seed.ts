import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users: Prisma.UserCreateManyInput[] = [
  {
    lastname: 'Fisher',
    firstname: 'Cody',
    email: 'cody.fisher@groupomania.fr',
    password: '$2b$10$Ko.gWkJDiOuXC3rd7XNgGuZK6d3LwrmmF2cQOf77OOx8iRPmiUpV6',
    position: 'CEO',
    picture: 'images/users/fisher.webp',
    role: 'MODERATOR'
  },
  {
    lastname: 'Lane',
    firstname: 'Devon',
    email: 'devon.lane@groupomania.fr',
    password: '$2b$10$Ko.gWkJDiOuXC3rd7XNgGuZK6d3LwrmmF2cQOf77OOx8iRPmiUpV6',
    position: 'Développeur web',
    picture: 'images/users/lane.webp'
  },
  {
    lastname: 'Jones',
    firstname: 'Jacob',
    email: 'jacob.jones@groupomania.fr',
    password: '$2b$10$Ko.gWkJDiOuXC3rd7XNgGuZK6d3LwrmmF2cQOf77OOx8iRPmiUpV6',
    position: 'Directeur marketing',
    picture: 'images/users/jones.webp'
  },
  {
    lastname: 'Cooper',
    firstname: 'Jane',
    email: 'jane.cooper@groupomania.fr',
    password: '$2b$10$Ko.gWkJDiOuXC3rd7XNgGuZK6d3LwrmmF2cQOf77OOx8iRPmiUpV6',
    position: 'Expert comptable',
    picture: 'images/users/cooper.webp'
  },
  {
    lastname: 'Watson',
    firstname: 'Kristin',
    email: 'kristin.watson@groupomania.fr',
    password: '$2b$10$Ko.gWkJDiOuXC3rd7XNgGuZK6d3LwrmmF2cQOf77OOx8iRPmiUpV6',
    position: 'Chargée de recrutement',
    picture: 'images/users/watson.webp'
  },
  {
    lastname: 'Richards',
    firstname: 'Ronald',
    email: 'ronald.richards@groupomania.fr',
    password: '$2b$10$Ko.gWkJDiOuXC3rd7XNgGuZK6d3LwrmmF2cQOf77OOx8iRPmiUpV6',
    position: 'Commercial',
    picture: 'images/users/richards.webp'
  }
]

const posts: Prisma.PostCreateManyInput[] = [
  {
    authorId: 1,
    content:
      "Bienvenue à tous sur notre nouveau réseau social ! Cet espace a été créé afin de partager nos expériences et apprendre à mieux nous connaître. Amusez-vous, mais n'oubliez pas de rester courtois 😉"
  },
  {
    authorId: 3,
    content: 'Préparez-vous pour du lourd à la cantine ce midi 😍 #food #mammamia',
    media: 'images/posts/food.webp'
  },
  {
    authorId: 2,
    content: 'Moi entre 2 réunions Zoom... 😴',
    media: 'images/posts/remote.webp'
  }
]

const comments: Prisma.CommentCreateManyInput[] = [
  {
    authorId: 5,
    postId: 1,
    content: 'Belle initiative !'
  },
  {
    authorId: 4,
    postId: 2,
    content: 'Ça donne faim ! 😁'
  },
  {
    authorId: 2,
    postId: 2,
    content: "J'en connais un qui va bien dormir en réunion après ce festin 🤣"
  },
  {
    authorId: 3,
    postId: 3,
    content: 'Apportez du café à cet homme !'
  },
  {
    authorId: 1,
    postId: 3,
    content: 'Elle est belle la jeunesse ...'
  }
]

const likes: Prisma.LikeCreateManyInput[] = [
  {
    userId: 2,
    postId: 1
  },
  {
    userId: 3,
    postId: 1
  },
  {
    userId: 4,
    postId: 1
  },
  {
    userId: 5,
    postId: 1
  },
  {
    userId: 6,
    postId: 1
  },
  {
    userId: 1,
    postId: 2
  },
  {
    userId: 4,
    postId: 2
  },
  {
    userId: 1,
    postId: 3
  }
]

const follows: Prisma.FollowCreateManyInput[] = [
  {
    followerId: 1,
    followingId: 2
  },
  {
    followerId: 2,
    followingId: 1
  },
  {
    followerId: 2,
    followingId: 4
  },
  {
    followerId: 5,
    followingId: 3
  },
  {
    followerId: 5,
    followingId: 2
  },
  {
    followerId: 3,
    followingId: 1
  },
  {
    followerId: 3,
    followingId: 5
  },
  {
    followerId: 4,
    followingId: 2
  }
]

const main = async () => {
  console.log('Start seeding ...')

  await prisma.user.createMany({
    data: users
  })

  await prisma.post.createMany({
    data: posts
  })

  await prisma.comment.createMany({
    data: comments
  })

  await prisma.like.createMany({
    data: likes
  })

  await prisma.follow.createMany({
    data: follows
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
