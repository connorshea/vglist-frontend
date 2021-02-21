// Basic class for making GraphQL queries.
class GraphQL {
  static query(query: string, variables = {}, accessToken: string): Promise<unknown> {
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
