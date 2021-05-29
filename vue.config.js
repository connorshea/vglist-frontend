module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
      // Load SVGs with the HTML loader.
      .rule('svg')
      .test(/\.svg$/)
      .use('html-loader')
      .loader('html-loader')
      .end();
  },
  // For properly setting the base path in 'production' with GitLab Pages.
  publicPath: process.env.NODE_ENV === 'production' ? '/' + process.env.CI_PROJECT_NAME + '/' : '/'
}
