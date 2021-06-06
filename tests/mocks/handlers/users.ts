import {
  EventCategory,
  UserActivityQuery,
  UserFavoritesQuery,
  UserFollowersQuery,
  UserFollowingQuery,
  UserPrivacy,
  UserQuery,
  UserQueryVariables,
  UserRole,
  UsersQuery
} from '@/generated/graphql';
import { graphql } from 'msw';

export const userHandlers = [
  graphql.query<UsersQuery>(
    'Users',
    (req, res, ctx) => {
      return res(
        ctx.data({
          users: {
            nodes: [
              {
                id: '1',
                username: 'johndoe',
                slug: 'johndoe',
                bio: 'foo',
                avatarUrl: null,
                privacy: UserPrivacy.PublicAccount,
                banned: false,
                role: UserRole.Member,
                gamePurchases: {
                  totalCount: 0
                }
              },
              {
                id: '2',
                username: 'janedoe',
                slug: 'janedoe',
                bio: 'bar',
                avatarUrl: null,
                privacy: UserPrivacy.PublicAccount,
                banned: false,
                role: UserRole.Moderator,
                gamePurchases: {
                  totalCount: 1
                }
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

  graphql.query<UserQuery, UserQueryVariables>(
    'User',
    (req, res, ctx) => {
      const { slug } = req.variables;

      return res(
        ctx.data({
          user: {
            id: '1',
            username: 'johndoe',
            slug: slug,
            bio: '',
            avatarUrl: null,
            privacy: UserPrivacy.PublicAccount,
            banned: false,
            role: UserRole.Member,
            isFollowed: false,
            followers: {
              totalCount: 0
            },
            following: {
              totalCount: 0
            }
          }
        })
      );
    }
  ),

  graphql.query<UserActivityQuery>(
    'UserActivity',
    (req, res, ctx) => {
      return res(
        ctx.data({
          user: {
            activity: {
              nodes: [
                {
                  id: '1',
                  eventCategory: EventCategory.AddToLibrary,
                  createdAt: new Date('2021-06-05').toISOString(),
                  user: {
                    slug: 'johndoe',
                    username: 'johndoe',
                    avatarUrl: null
                  },
                  eventable: {
                    __typename: 'GamePurchase',
                    game: {
                      id: '1',
                      name: 'Half-Life 2'
                    }
                  }
                },
                {
                  id: '2',
                  eventCategory: EventCategory.NewUser,
                  createdAt: new Date('2021-06-05').toISOString(),
                  user: {
                    slug: 'johndoe',
                    username: 'johndoe',
                    avatarUrl: null
                  },
                  eventable: {
                    __typename: 'User',
                    slug: 'johndoe',
                    username: 'johndoe'
                  }
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

  graphql.query<UserFavoritesQuery>(
    'UserFavorites',
    (req, res, ctx) => {
      return res(
        ctx.data({
          user: {
            favoritedGames: {
              nodes: [
                {
                  id: '1',
                  name: 'Half-Life 2',
                  coverUrl: null,
                  platforms: {
                    nodes: []
                  },
                  developers: {
                    nodes: []
                  },
                  isFavorited: true
                },
                {
                  id: '2',
                  name: 'Portal 2',
                  coverUrl: null,
                  platforms: {
                    nodes: []
                  },
                  developers: {
                    nodes: []
                  },
                  isFavorited: true
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

  graphql.query<UserFollowingQuery>(
    'UserFollowing',
    (req, res, ctx) => {
      return res(
        ctx.data({
          user: {
            following: {
              nodes: [
                {
                  id: '2',
                  username: 'janedoe',
                  slug: 'janedoe',
                  bio: 'foo',
                  avatarUrl: null,
                  privacy: UserPrivacy.PublicAccount,
                  banned: false,
                  role: UserRole.Member,
                  gamePurchases: {
                    totalCount: 0
                  }
                },
                {
                  id: '3',
                  username: 'gordon_freeman',
                  slug: 'gordon_freeman',
                  bio: 'foo',
                  avatarUrl: null,
                  privacy: UserPrivacy.PublicAccount,
                  banned: false,
                  role: UserRole.Moderator,
                  gamePurchases: {
                    totalCount: 3
                  }
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

  graphql.query<UserFollowersQuery>(
    'UserFollowers',
    (req, res, ctx) => {
      return res(
        ctx.data({
          user: {
            followers: {
              nodes: [
                {
                  id: '2',
                  username: 'janedoe',
                  slug: 'janedoe',
                  bio: 'foo',
                  avatarUrl: null,
                  privacy: UserPrivacy.PublicAccount,
                  banned: false,
                  role: UserRole.Member,
                  gamePurchases: {
                    totalCount: 0
                  }
                },
                {
                  id: '3',
                  username: 'gordon_freeman',
                  slug: 'gordon_freeman',
                  bio: 'foo',
                  avatarUrl: null,
                  privacy: UserPrivacy.PublicAccount,
                  banned: false,
                  role: UserRole.Moderator,
                  gamePurchases: {
                    totalCount: 3
                  }
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
];
