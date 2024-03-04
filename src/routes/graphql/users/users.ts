import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { PrismaClient } from '@prisma/client';
import { profileType } from '../profiles/profiles.js';
import { postsType } from '../posts/posts.js';

const prisma = new PrismaClient();

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: profileType,
      resolve: async (parent: { id: string }) => {
        const profile = await prisma.profile.findUnique({ where: { userId: parent.id } });
        return profile;
      },
    },
    posts: {
      type: postsType,
      resolve: async (parent: { id: string }) => {
        const posts = await prisma.post.findMany({ where: { authorId: parent.id } });
        return posts;
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      resolve: async (parent: { id: string }) => {
        const subscribedToUsers = await prisma.user.findMany({
          where: { subscribedToUser: { some: { subscriberId: parent.id } } },
        });
        return subscribedToUsers;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      resolve: async (parent: { id: string }) => {
        const userSubscribedTo = await prisma.user.findMany({
          where: { userSubscribedTo: { some: { authorId: parent.id } } },
        });
        return userSubscribedTo;
      },
    },
  }),
});

export const usersType = new GraphQLList(userType);
