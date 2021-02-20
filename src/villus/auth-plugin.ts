import { definePlugin, ClientPlugin } from 'villus';

export default (accessToken: string): ClientPlugin => {
  return definePlugin(({ opContext }) => {
    opContext.headers.Authorization = `Bearer ${accessToken}`;
  });
};
