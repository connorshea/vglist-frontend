import { createClient, defaultPlugins } from 'villus';

// Creates a villus client instance
export default createClient({
  url: 'https://vglist.co/graphql',
  use: [...defaultPlugins()]
});
