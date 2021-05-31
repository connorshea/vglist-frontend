import {
  FavoriteGameMutation,
  FavoriteGameMutationVariables,
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
];
