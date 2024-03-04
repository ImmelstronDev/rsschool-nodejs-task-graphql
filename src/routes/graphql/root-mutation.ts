import { PrismaClient } from '@prisma/client';
import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ChangePostInput, CreatePostInput, postType } from './posts/posts.js';
import { UUIDType } from './types/uuid.js';
import {
  CreatePost,
  CreateProfile,
  CreateUser,
  UpdatePost,
  UpdateProfile,
  UpdateUser,
} from './mutation-interfases.js';
import {
  ChangeProfileInput,
  CreateProfileInput,
  profileType,
} from './profiles/profiles.js';
import { ChangeUserInput, CreateUserInput, userType } from './users/users.js';

const prisma = new PrismaClient();

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: postType,
      args: {
        // title: { type: new GraphQLNonNull(GraphQLString) },
        // content: { type: new GraphQLNonNull(GraphQLString) },
        // authorId: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },

      resolve: async (_, args: CreatePost) => {
        const post = await prisma.post.create({ data: args.dto });
        return post;
      },
    },
    changePost: {
      type: postType,
      args: {
        // title: { type: GraphQLString },
        // content: { type: GraphQLString },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { dto, id }: UpdatePost) => {
        const post = await prisma.post.update({ where: { id }, data: dto });
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
        // isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        // yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        // memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
        // userId: { type: new GraphQLNonNull(UUIDType) },
        dto: {
          type: new GraphQLNonNull(CreateProfileInput),
        },
      },
      resolve: async (_, args: CreateProfile) => {
        const profile = await prisma.profile.create({ data: args.dto });
        return profile;
      },
    },
    changeProfile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        // isMale: { type: GraphQLBoolean },
        // yearOfBirth: { type: GraphQLInt },
        // memberTypeId: { type: MemberTypeId },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (_, args: UpdateProfile) => {
        const profile = await prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
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
        // name: { type: new GraphQLNonNull(GraphQLString) },
        // balance: { type: new GraphQLNonNull(GraphQLFloat) },
        dto: {
          type: new GraphQLNonNull(CreateUserInput),
        },
      },
      resolve: async (_, args: CreateUser) => {
        const user = prisma.user.create({ data: args.dto });
        return user;
      },
    },
    changeUser: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        // name: { type: GraphQLString },
        // balance: { type: GraphQLFloat },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (_, args: UpdateUser) => {
        const user = await prisma.user.update({
          where: { id: args.id },
          data: args.dto,
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
