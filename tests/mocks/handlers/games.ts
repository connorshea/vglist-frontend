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
                name: 'Half-Life 2'
              },
              {
                id: '2',
                name: 'Portal 2'
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
            steamAppIds: []
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
