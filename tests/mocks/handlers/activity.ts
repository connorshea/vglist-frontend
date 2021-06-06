import {
  ActivityFeedQuery,
  ActivityFeedQueryVariables,
  EventCategory
} from '@/generated/graphql';
import { graphql } from 'msw';

export const activityHandlers = [
  // This will be used for both the global and 'following' feed type.
  graphql.query<ActivityFeedQuery, ActivityFeedQueryVariables>(
    'ActivityFeed',
    (req, res, ctx) => {
      return res(
        ctx.data({
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
        })
      );
    }
  ),
];
