import { GraphQLEnumType } from 'graphql';
import { MemberTypeId as MemberTypeIdFromSchemas } from '../../member-types/schemas.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    [MemberTypeIdFromSchemas.BASIC]: { value: MemberTypeIdFromSchemas.BASIC },
    [MemberTypeIdFromSchemas.BUSINESS]: { value: MemberTypeIdFromSchemas.BUSINESS },
  },
});
