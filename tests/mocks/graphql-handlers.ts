import {
  FavoriteGameMutation,
  FavoriteGameMutationVariables,
  UnfavoriteGameMutation,
  UnfavoriteGameMutationVariables
} from '@/generated/graphql';
import { companyHandlers } from './handlers/companies';
import { engineHandlers } from './handlers/engines';
import { genreHandlers } from './handlers/genres';
import { seriesHandlers } from './handlers/series';
import { platformHandlers } from './handlers/platforms';
import { storeHandlers } from './handlers/stores';
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
  ...companyHandlers,
  ...platformHandlers,
  ...engineHandlers,
  ...seriesHandlers,
  ...storeHandlers,
  ...genreHandlers
];
