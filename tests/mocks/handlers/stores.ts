import {
  DeleteStoreMutation,
  DeleteStoreMutationVariables,
  StoreQuery,
  StoreQueryVariables,
  StoreSearchQuery,
  StoreSearchQueryVariables,
  StoresQuery,
  StoresQueryVariables
} from '@/generated/graphql';
import { graphql } from 'msw';

export const storeHandlers = [
  graphql.query<StoresQuery, StoresQueryVariables>(
    'Stores',
    (req, res, ctx) => {
      return res(
        ctx.data({
          stores: {
            nodes: [
              {
                id: '1',
                name: 'Nintendo eShop'
              },
              {
                id: '2',
                name: 'Steam'
              }
            ],
            pageInfo: {
              hasPreviousPage: false,
              hasNextPage: false,
              startCursor: 'mA',
              endCursor: 'mB'
            }
          }
        })
      );
    }
  ),

  graphql.query<StoreQuery, StoreQueryVariables>(
    'Store',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          store: {
            id: id,
            name: 'Nintendo eShop'
          }
        })
      );
    }
  ),

  graphql.query<StoreSearchQuery, StoreSearchQueryVariables>(
    'StoreSearch',
    (req, res, ctx) => {
      return res(
        ctx.data({
          storeSearch: {
            nodes: [
              {
                id: '1',
                name: 'Nintendo eShop'
              },
              {
                id: '2',
                name: 'Steam'
              }
            ]
          }
        })
      );
    }
  ),

  graphql.mutation<DeleteStoreMutation, DeleteStoreMutationVariables>(
    'DeleteStore',
    (req, res, ctx) => {
      return res(
        ctx.data({
          deleteStore: {
            deleted: true
          }
        })
      );
    }
  )
];
