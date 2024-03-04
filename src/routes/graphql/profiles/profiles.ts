import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../types/memberTypeId.js';
import { PrismaClient } from '@prisma/client';
import { memberType } from '../member-types/member-type.js';

const prisma = new PrismaClient();

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: memberType,
      resolve: async (parent: { memberTypeId: string }) => {
        const memberType = await prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        });
        return memberType;
      },
    },
  }),
});

export const profilesType = new GraphQLList(profileType);
