# vglist-frontend

An experimental frontend made entirely in Vue for [vglist](https://github.com/connorshea/vglist).

## Project setup

- Install dependencies with `yarn install`.
- Clone the vglist backend with `git clone https://github.com/connorshea/vglist.git` (probably in a separate directory), see the instructions in the [CONTRIBUTING.md](https://github.com/connorshea/vglist/blob/master/CONTRIBUTING.md) for the backend project to set it up.
- Once the backend is set up and running, log in and go to Settings > Developer > [Applications > New Application](http://localhost:3000/settings/oauth/applications/new) and create an application with the following:
  - Name: Whatever you want, I use `Local vglist Vue frontend`
  - Redirect URI: `http://localhost:8080`
  - Confidential: false
  - Scopes: `read write`
- Create the OAuth Application and make note of its "Application UID", the secret is irrelevant.
- Create a `.env.development.local` file in vglist-frontend with the following content:

```
VUE_APP_OAUTH_CLIENT_ID=$VGLIST_EXPERIMENTAL_FRONTEND_OAUTH_ID_LOCAL
VUE_APP_REDIRECT_URL=http://localhost:8080
VUE_APP_VGLIST_HOST_URL=http://localhost:3000
```

- You may do one of two things to set the `VUE_APP_OAUTH_CLIENT_ID`:
  - Create an environment variable called `VGLIST_EXPERIMENTAL_FRONTEND_OAUTH_ID_LOCAL` (probably in your `.bash_profile` or `.zsh_profile`) and set it to the "Application UID" you got before.
  - Or you can just set it directly in `.env.development.local` with the value of the Application UID.
- Now you can run `yarn serve` and the frontend should be available at http://localhost:8080.
- Note that right now there's not a proper login flow! You'll have to use the "Authenticate" button which will direct you to the vglist Rails app and have you go through the OAuth application authorization flow. It will require re-authentication roughly every ten minutes. It's not great, but hey it's still in development.

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Updating the generated GraphQL types

- In your copy of the `vglist` Rails app, run `bundle exec rake graphql:schema:dump` to generate a dump of the GraphQL schema.
- Copy the newly-generated `schema.graphql` file to the vglist-frontend directory, probably with `cp schema.graphql ../vglist-frontend`.
- In vglist-frontend, run `yarn run generate` to regenerate the GraphQL types.
- Commit changes!

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## License

vglist-frontend's source code is licensed under the terms of [The MIT License](LICENSE).

Icons are courtesy of [Font Awesome](https://fontawesome.com), licensed as [CC-BY-SA 4.0](https://creativecommons.org/licenses/by/4.0/).
