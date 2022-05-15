import {
  DeleteGameMutation,
  DeleteGameMutationVariables,
  GameQuery,
  GameQueryVariables,
  GameSearchQuery,
  GameSearchQueryVariables,
  GamesQuery,
  GamesQueryVariables
} from '@/generated/graphql';
import { graphql } from 'msw';

export const gameHandlers = [
  graphql.query<GamesQuery, GamesQueryVariables>(
    'Games',
    (req, res, ctx) => {
      return res(
        ctx.data({
          games: {
            nodes: [
              {
                id: '1',
                name: 'Half-Life 2',
                developers: { nodes: [], totalCount: 0 },
                platforms: { nodes: [], totalCount: 0 }
              },
              {
                id: '2',
                name: 'Portal 2',
                developers: { nodes: [], totalCount: 0 },
                platforms: { nodes: [], totalCount: 0 }
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

  graphql.query<GameQuery, GameQueryVariables>(
    'Game',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          game: {
            id: id,
            name: 'Half-Life 2',
            wikidataId: 123,
            steamAppIds: [],
            releaseDate: null,
            coverUrl: null,
            avgRating: null,
            genres: {
              nodes: []
            },
            platforms: {
              nodes: []
            },
            series: null,
            developers: {
              nodes: []
            },
            publishers: {
              nodes: []
            },
            engines: {
              nodes: []
            },
            owners: {
              nodes: [],
              totalCount: 0
            },
            favoriters: {
              nodes: [],
              totalCount: 0
            },
            igdbId: null,
            gogId: null,
            epicGamesStoreId: null,
            mobygamesId: null,
            pcgamingwikiId: null,
            giantbombId: null,
            isFavorited: false,
            isInLibrary: false,
            gamePurchaseId: null
          }
        })
      );
    }
  ),

  graphql.query<GameSearchQuery, GameSearchQueryVariables>(
    'GameSearch',
    (req, res, ctx) => {
      return res(
        ctx.data({
          gameSearch: {
            nodes: [
              {
                id: '1',
                name: 'Half-Life 1'
              },
              {
                id: '2',
                name: 'Half-Life 2'
              }
            ]
          }
        })
      );
    }
  ),

  graphql.mutation<DeleteGameMutation, DeleteGameMutationVariables>(
    'DeleteGame',
    (req, res, ctx) => {
      return res(
        ctx.data({
          deleteGame: {
            deleted: true
          }
        })
      );
    }
  )
];
