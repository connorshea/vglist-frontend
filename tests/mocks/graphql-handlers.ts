import {
  DeleteEngineMutation,
  DeleteEngineMutationVariables,
  DeleteGenreMutation,
  DeleteGenreMutationVariables,
  DeletePlatformMutation,
  DeletePlatformMutationVariables,
  DeleteSeriesMutation,
  DeleteSeriesMutationVariables,
  DeleteStoreMutation,
  DeleteStoreMutationVariables,
  EngineQuery,
  EngineQueryVariables,
  EngineSearchQuery,
  EngineSearchQueryVariables,
  EnginesQuery,
  EnginesQueryVariables,
  FavoriteGameMutation,
  FavoriteGameMutationVariables,
  GenreQuery,
  GenreQueryVariables,
  GenreSearchQuery,
  GenreSearchQueryVariables,
  GenresQuery,
  GenresQueryVariables,
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
  StoreQuery,
  StoreQueryVariables,
  StoreSearchQuery,
  StoreSearchQueryVariables,
  StoresQuery,
  StoresQueryVariables,
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
  ),


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
  ),


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
  ),
];
