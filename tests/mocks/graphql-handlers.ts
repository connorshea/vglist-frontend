import {
  DeleteSeriesMutation,
  DeleteSeriesMutationVariables,
  FavoriteGameMutation,
  FavoriteGameMutationVariables,
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
];
