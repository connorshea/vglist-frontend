import { HomeStatisticsQuery } from '@/generated/graphql';
import { graphql } from 'msw';

export const miscHandlers = [
  graphql.query<HomeStatisticsQuery>(
    'HomeStatistics',
    (req, res, ctx) => {
      return res(
        ctx.data({
          basicSiteStatistics: {
            companies: 1,
            engines: 2,
            games: 3,
            genres: 4,
            platforms: 5,
            series: 6
          }
        })
      );
    }
  ),
];
