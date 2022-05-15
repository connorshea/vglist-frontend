import {
  DeleteGenreMutation,
  DeleteGenreMutationVariables,
  GenreQuery,
  GenreQueryVariables,
  GenreSearchQuery,
  GenreSearchQueryVariables,
  GenresQuery,
  GenresQueryVariables
} from '@/generated/graphql';
import { graphql } from 'msw';

export const genreHandlers = [
  graphql.query<GenresQuery, GenresQueryVariables>(
    'Genres',
    (req, res, ctx) => {
      return res(
        ctx.data({
          genres: {
            nodes: [
              {
                id: '1',
                name: 'first-person shooter'
              },
              {
                id: '2',
                name: 'third-person shooter'
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

  graphql.query<GenreQuery, GenreQueryVariables>(
    'Genre',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          genre: {
            id: id,
            name: 'first-person shooter',
            wikidataId: 123,
            games: {
              nodes: [
                {
                  id: '1',
                  name: 'Half-Life 1',
                  coverUrl: null,
                  platforms: {
                    nodes: [{ name: 'Windows' }],
                    totalCount: 1
                  },
                  developers: {
                    nodes: [{ name: 'Valve' }],
                    totalCount: 1
                  },
                  isFavorited: false
                },
                {
                  id: '2',
                  name: 'Half-Life 2',
                  coverUrl: null,
                  platforms: {
                    nodes: [{ name: 'Windows' }],
                    totalCount: 1
                  },
                  developers: {
                    nodes: [{ name: 'Valve' }],
                    totalCount: 1
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

  graphql.query<GenreSearchQuery, GenreSearchQueryVariables>(
    'GenreSearch',
    (req, res, ctx) => {
      return res(
        ctx.data({
          genreSearch: {
            nodes: [
              {
                id: '1',
                name: 'first-person shooter'
              },
              {
                id: '2',
                name: 'third-person shooter'
              }
            ]
          }
        })
      );
    }
  ),

  graphql.mutation<DeleteGenreMutation, DeleteGenreMutationVariables>(
    'DeleteGenre',
    (req, res, ctx) => {
      return res(
        ctx.data({
          deleteGenre: {
            deleted: true
          }
        })
      );
    }
  )
];
