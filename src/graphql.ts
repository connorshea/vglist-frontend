import { DocumentNode, print } from 'graphql';

// Basic class for making GraphQL queries.
class GraphQL {
  static query(query: string | DocumentNode, variables = {}, accessToken: string): Promise<unknown> {
    // Turn the query into a string if it's coming in as a DocumentNode.
    if (typeof query !== 'string') {
      query = print(query);
    }

    const url = `${process.env.VUE_APP_VGLIST_HOST_URL}/graphql`;
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    };

    // Make the GraphQL request
    return fetch(url, options)
      .then(response => response.json())
      .then(data => data);
  }
}

export default GraphQL;
