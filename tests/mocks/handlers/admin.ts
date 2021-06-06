import {
  SteamBlocklistQuery,
  WikidataBlocklistQuery
} from '@/generated/graphql';
import { graphql } from 'msw';

export const adminHandlers = [
  graphql.query<SteamBlocklistQuery>(
    'SteamBlocklist',
    (req, res, ctx) => {
      return res(
        ctx.data({
          steamBlocklist: {
            nodes: [
              {
                id: '1',
                name: 'Pokemon Sword & Shield',
                steamAppId: 123,
                user: {
                  username: 'johndoe',
                  slug: 'johndoe'
                },
                createdAt: new Date('2021-06-03').toISOString()
              },
              {
                id: '2',
                name: 'Pokemon Black & White',
                steamAppId: 124,
                user: {
                  username: 'johndoe',
                  slug: 'johndoe'
                },
                createdAt: new Date('2021-06-05').toISOString()
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

  graphql.query<WikidataBlocklistQuery>(
    'WikidataBlocklist',
    (req, res, ctx) => {
      return res(
        ctx.data({
          wikidataBlocklist: {
            nodes: [
              {
                id: '1',
                name: 'Pokemon Sword & Shield',
                wikidataId: 123,
                user: {
                  username: 'johndoe',
                  slug: 'johndoe'
                },
                createdAt: new Date('2021-06-03').toISOString()
              },
              {
                id: '2',
                name: 'Pokemon Black & White',
                wikidataId: 124,
                user: {
                  username: 'johndoe',
                  slug: 'johndoe'
                },
                createdAt: new Date('2021-06-05').toISOString()
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
