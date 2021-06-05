import {
  DeletePlatformMutation,
  DeletePlatformMutationVariables,
  PlatformQuery,
  PlatformQueryVariables,
  PlatformSearchQuery,
  PlatformSearchQueryVariables,
  PlatformsQuery,
  PlatformsQueryVariables,
} from '@/generated/graphql';
import { graphql } from 'msw';

export const platformHandlers = [
  graphql.query<PlatformsQuery, PlatformsQueryVariables>(
    'Platforms',
    (req, res, ctx) => {
      return res(
        ctx.data({
          platforms: {
            nodes: [
              {
                id: '1',
                name: 'Nintendo Switch'
              },
              {
                id: '2',
                name: 'Nintendo DS'
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

  graphql.query<PlatformQuery, PlatformQueryVariables>(
    'Platform',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          platform: {
            id: id,
            name: 'Windows',
            wikidataId: 123,
            games: {
              nodes: [
                {
                  id: '1',
                  name: 'Half-Life 1',
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
                  name: 'Half-Life 2',
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

  graphql.query<PlatformSearchQuery, PlatformSearchQueryVariables>(
    'PlatformSearch',
    (req, res, ctx) => {
      return res(
        ctx.data({
          platformSearch: {
            nodes: [
              {
                id: '1',
                name: 'Nintendo Switch'
              },
              {
                id: '2',
                name: 'Nintendo Wii'
              }
            ]
          }
        })
      );
    }
  ),

  graphql.mutation<DeletePlatformMutation, DeletePlatformMutationVariables>(
    'DeletePlatform',
    (req, res, ctx) => {
      return res(
        ctx.data({
          deletePlatform: {
            deleted: true
          }
        })
      );
    }
  )
];
