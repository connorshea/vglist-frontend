export class GraphQL {
  query(query: string, variables = {}, accessToken: string): Promise<unknown> {
    const url = 'https://vglist.co/graphql';
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

    // Make the HTTP Request
    return fetch(url, options)
      .then(response => response.json())
      .then(data => data);
  }
}
