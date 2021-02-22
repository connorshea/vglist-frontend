import { ClientPlugin, definePlugin } from "villus";

export const authPlugin = (config: { accessToken: string }): ClientPlugin => {
  return definePlugin(({ opContext }) => {
    opContext.headers.Authorization = `Bearer ${config.accessToken}`;
  });
};
