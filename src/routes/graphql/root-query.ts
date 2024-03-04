import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { postType, postsType } from './posts/posts.js';
import { UUIDType } from './types/uuid.js';
import { memberType, membersType } from './member-types/member-type.js';
import { MemberTypeId } from './types/memberTypeId.js';
import { profileType, profilesType } from './profiles/profiles.js';
import { userType, usersType } from './users/users.js';

const prisma = new PrismaClient();

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: postsType,
      resolve: async () => {
        const posts = await prisma.post.findMany();
        return posts;
      },
    },
    post: {
      type: postType,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, args: { id: string }) => {
        const post = await prisma.post.findUnique({ where: { id: args.id } });

        return post;
      },
    },
    memberTypes: {
      type: membersType,
      resolve: async () => {
        const members = await prisma.memberType.findMany();
        return members;
      },
    },
    memberType: {
      type: memberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: async (_, args: { id: string }) => {
        const member = await prisma.memberType.findUnique({ where: { id: args.id } });
        return member;
      },
    },
    profiles: {
      type: profilesType,
      resolve: async () => {
        const profiles = await prisma.profile.findMany();
        return profiles;
      },
    },
    profile: {
      type: profileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }) => {
        const profile = await prisma.profile.findUnique({ where: { id: args.id } });
        return profile;
      },
    },
    users: {
      type: usersType,
      resolve: async () => {
        const users = await prisma.user.findMany();
        return users;
      },
    },
    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: { id: string }) => {
        const user = await prisma.user.findUnique({ where: { id: args.id } });
        return user;
      },
    },
  }),
});
