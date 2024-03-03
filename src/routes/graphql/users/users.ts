import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const usersType = new GraphQLList(userType);
