import { PrismaClient } from '@prisma/client';
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { postType } from './posts/posts.js';
import { UUIDType } from './types/uuid.js';
import {
  CreatePost,
  CreateProfile,
  CreateUser,
  UpdatePost,
  UpdateProfile,
  UpdateUser,
} from './mutation-interfases.js';
import { profileType } from './profiles/profiles.js';
import { MemberTypeId } from './types/memberTypeId.js';
import { userType } from './users/users.js';

const prisma = new PrismaClient();

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: postType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },

      resolve: async (_, args: CreatePost) => {
        const post = await prisma.post.create({ data: args });
        return post;
      },
    },
    updatePost: {
      type: postType,
      args: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (args: UpdatePost) => {
        const post = await prisma.post.update({ where: { id: args.id }, data: args });
        return post;
      },
    },
    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }) => {
        await prisma.post.delete({ where: { id: args.id } });
      },
    },
    createProfile: {
      type: profileType,
      args: {
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
        userId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, args: CreateProfile) => {
        const profile = await prisma.profile.create({ data: args });
        return profile;
      },
    },
    updateProfile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeId },
      },
      resolve: async (_, args: UpdateProfile) => {
        const profile = await prisma.profile.update({
          where: { id: args.id },
          data: args,
        });
        return profile;
      },
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }) => {
        await prisma.profile.delete({ where: { id: args.id } });
      },
    },
    createUser: {
      type: userType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve: async (_, args: CreateUser) => {
        const user = prisma.user.create({ data: args });
        return user;
      },
    },
    updateUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
      },
      resolve: async (_, args: UpdateUser) => {
        const user = await prisma.user.update({
          where: { id: args.id },
          data: args,
        });
        return user;
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_, args: { id: string }) => {
        await prisma.user.delete({ where: { id: args.id } });
      },
    },
  }),
});
