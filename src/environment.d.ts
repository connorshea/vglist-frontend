declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VUE_APP_OAUTH_CLIENT_ID: string;
      VUE_APP_REDIRECT_URL: string;
      VUE_APP_VGLIST_HOST_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
