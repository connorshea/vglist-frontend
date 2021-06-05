import {
  CompaniesQuery,
  CompaniesQueryVariables,
  CompanyQuery,
  CompanyQueryVariables,
  CompanySearchQuery,
  CompanySearchQueryVariables,
  DeleteCompanyMutation,
  DeleteCompanyMutationVariables
} from '@/generated/graphql';
import { graphql } from 'msw';

export const companyHandlers = [
  graphql.query<CompaniesQuery, CompaniesQueryVariables>(
    'Companies',
    (req, res, ctx) => {
      return res(
        ctx.data({
          companies: {
            nodes: [
              {
                id: '1',
                name: 'Valve Software'
              },
              {
                id: '2',
                name: 'Nintendo'
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

  graphql.query<CompanyQuery, CompanyQueryVariables>(
    'Company',
    (req, res, ctx) => {
      const { id } = req.variables;

      return res(
        ctx.data({
          company: {
            id: id,
            name: 'Valve Software',
            wikidataId: 123,
            developedGames: {
              nodes: [
                {
                  id: '1',
                  name: 'Portal 2',
                  coverUrl: null,
                  isFavorited: false
                },
                {
                  id: '2',
                  name: 'Half-Life 2',
                  coverUrl: null,
                  isFavorited: false
                }
              ],
              pageInfo: {
                hasPreviousPage: false,
                hasNextPage: false,
                startCursor: 'mA',
                endCursor: 'mB'
              }
            },
            publishedGames: {
              nodes: [
                {
                  id: '3',
                  name: 'Minecraft',
                  coverUrl: null,
                  isFavorited: false
                },
                {
                  id: '4',
                  name: 'Hexcells',
                  coverUrl: null,
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

  graphql.query<CompanySearchQuery, CompanySearchQueryVariables>(
    'CompanySearch',
    (req, res, ctx) => {
      return res(
        ctx.data({
          companySearch: {
            nodes: [
              {
                id: '1',
                name: 'Valve Software'
              },
              {
                id: '2',
                name: 'Nintendo'
              }
            ]
          }
        })
      );
    }
  ),

  graphql.mutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(
    'DeleteCompany',
    (req, res, ctx) => {
      return res(
        ctx.data({
          deleteCompany: {
            deleted: true
          }
        })
      );
    }
  ),
];
