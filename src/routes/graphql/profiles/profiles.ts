import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { MemberTypeId } from '../types/memberTypeId.js';

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const profilesType = new GraphQLList(profileType);
