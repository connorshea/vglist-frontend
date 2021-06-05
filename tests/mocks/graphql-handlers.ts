import {
  DeletePlatformMutation,
  DeletePlatformMutationVariables,
  DeleteSeriesMutation,
  DeleteSeriesMutationVariables,
  FavoriteGameMutation,
  FavoriteGameMutationVariables,
  PlatformQuery,
  PlatformQueryVariables,
  PlatformSearchQuery,
  PlatformSearchQueryVariables,
  PlatformsQuery,
  PlatformsQueryVariables,
  SeriesListQuery,
  SeriesListQueryVariables,
  SeriesQuery,
  SeriesQueryVariables,
  SeriesSearchQuery,
  SeriesSearchQueryVariables,
  UnfavoriteGameMutation,
  UnfavoriteGameMutationVariables
} from '@/generated/graphql';
import { graphql } from 'msw';

export const handlers = [
  graphql.mutation<UnfavoriteGameMutation, UnfavoriteGameMutationVariables>(
    'UnfavoriteGame',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          unfavoriteGame: {
            game: {
              id,
              name: "Half-Life 2"
            }
          }
        })
      );
    }
  ),

  graphql.mutation<FavoriteGameMutation, FavoriteGameMutationVariables>(
    'FavoriteGame',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          favoriteGame: {
            game: {
              id,
              name: "Half-Life 2"
            }
          }
        })
      );
    }
  ),

  graphql.query<SeriesListQuery, SeriesListQueryVariables>(
    'SeriesList',
    (req, res, ctx) => {
      return res(
        ctx.data({
          seriesList: {
            nodes: [
              {
                id: '1',
                name: 'Half-Life'
              },
              {
                id: '2',
                name: 'Portal'
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

  graphql.query<SeriesQuery, SeriesQueryVariables>(
    'Series',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          series: {
            id: id,
            name: 'Half-Life',
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

  graphql.query<SeriesSearchQuery, SeriesSearchQueryVariables>(
    'SeriesSearch',
    (req, res, ctx) => {
      return res(
        ctx.data({
          seriesSearch: {
            nodes: [
              {
                id: '1',
                name: 'Super Mario Bros'
              },
              {
                id: '2',
                name: 'Mario Kart'
              }
            ]
          }
        })
      );
    }
  ),

  graphql.mutation<DeleteSeriesMutation, DeleteSeriesMutationVariables>(
    'DeleteSeries',
    (req, res, ctx) => {
      return res(
        ctx.data({
          deleteSeries: {
            deleted: true
          }
        })
      );
    }
  ),

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
  ),
];
