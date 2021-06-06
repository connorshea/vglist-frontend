import {
  LiveStatisticsQuery,
  SiteStatisticsQuery,
  SteamBlocklistQuery,
  WikidataBlocklistQuery
} from '@/generated/graphql';
import { graphql } from 'msw';

export const adminHandlers = [
  graphql.query<LiveStatisticsQuery>(
    'LiveStatistics',
    (req, res, ctx) => {
      return res(
        ctx.data({
          liveStatistics: {
            users: 123,
            games: 123,
            platforms: 123,
            series: 123,
            engines: 123,
            companies: 123,
            genres: 123,
            stores: 123,
            events: 123,
            gamePurchases: 123,
            relationships: 123,
            gamesWithCovers: 123,
            gamesWithReleaseDates: 123,
            bannedUsers: 123,
            mobygamesIds: 123,
            pcgamingwikiIds: 123,
            wikidataIds: 123,
            giantbombIds: 123,
            steamAppIds: 123,
            epicGamesStoreIds: 123,
            gogIds: 123,
            igdbIds: 123,
            companyVersions: 123,
            gameVersions: 123,
            genreVersions: 123,
            engineVersions: 123,
            platformVersions: 123,
            seriesVersions: 123
          }
        })
      );
    }
  ),

  graphql.query<SiteStatisticsQuery>(
    'SiteStatistics',
    (req, res, ctx) => {
      return res(
        ctx.data({
          siteStatistics: {
            nodes: [
              {
                id: '1',
                timestamp: new Date('2021-06-05').toISOString(),
                users: 123,
                games: 123,
                platforms: 123,
                series: 123,
                engines: 123,
                companies: 123,
                genres: 123,
                stores: 123,
                events: 123,
                gamePurchases: 123,
                relationships: 123,
                gamesWithCovers: 123,
                gamesWithReleaseDates: 123,
                bannedUsers: 123,
                mobygamesIds: 123,
                pcgamingwikiIds: 123,
                wikidataIds: 123,
                giantbombIds: 123,
                steamAppIds: 123,
                epicGamesStoreIds: 123,
                gogIds: 123,
                igdbIds: 123,
                companyVersions: 123,
                gameVersions: 123,
                genreVersions: 123,
                engineVersions: 123,
                platformVersions: 123,
                seriesVersions: 123
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
