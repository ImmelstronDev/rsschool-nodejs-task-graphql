import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberTypeId } from '../types/memberTypeId.js';

export const memberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});

export const membersType = new GraphQLList(memberType);
