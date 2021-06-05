import {
  DeleteEngineMutation,
  DeleteEngineMutationVariables,
  EngineQuery,
  EngineQueryVariables,
  EngineSearchQuery,
  EngineSearchQueryVariables,
  EnginesQuery,
  EnginesQueryVariables,
} from '@/generated/graphql';
import { graphql } from 'msw';

export const engineHandlers = [
  graphql.query<EnginesQuery, EnginesQueryVariables>(
    'Engines',
    (req, res, ctx) => {
      return res(
        ctx.data({
          engines: {
            nodes: [
              {
                id: '1',
                name: 'Source Engine'
              },
              {
                id: '2',
                name: 'Unreal Engine'
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

  graphql.query<EngineQuery, EngineQueryVariables>(
    'Engine',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          engine: {
            id: id,
            name: 'Source Engine',
            wikidataId: 123,
            games: {
              nodes: [
                {
                  id: '1',
                  name: 'Half-Life 2',
                  coverUrl: null,
                  platforms: {
                    nodes: [{ name: 'Windows' }]
                  },
                  developers: {
                    nodes: [{ name: 'Valve' }]
                  },
                  isFavorited: false
                },
                {
                  id: '2',
                  name: 'Portal 2',
                  coverUrl: null,
                  platforms: {
                    nodes: [{ name: 'Windows' }]
                  },
                  developers: {
                    nodes: [{ name: 'Valve' }]
                  },
                  isFavorited: false
                }
              ],
              pageInfo: {
                hasPreviousPage: false,
                hasNextPage: false,
                startCursor: 'mA',
                endCursor: 'mB'
              }
            }
          }
        })
      );
    }
  ),

  graphql.query<EngineSearchQuery, EngineSearchQueryVariables>(
    'EngineSearch',
    (req, res, ctx) => {
      return res(
        ctx.data({
          engineSearch: {
            nodes: [
              {
                id: '1',
                name: 'Source Engine'
              },
              {
                id: '2',
                name: 'Unreal Engine'
              }
            ]
          }
        })
      );
    }
  ),

  graphql.mutation<DeleteEngineMutation, DeleteEngineMutationVariables>(
    'DeleteEngine',
    (req, res, ctx) => {
      return res(
        ctx.data({
          deleteEngine: {
            deleted: true
          }
        })
      );
    }
  )
];
