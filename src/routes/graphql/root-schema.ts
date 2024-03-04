import { GraphQLSchema } from 'graphql';
import { rootQuery } from './root-query.js';
import { rootMutation } from './root-mutation.js';

export const rootSchema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
