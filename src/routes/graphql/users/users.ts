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
  }),
});

export const usersType = new GraphQLList(userType);
