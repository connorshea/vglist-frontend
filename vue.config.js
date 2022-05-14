module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');

  },
  // For properly setting the base path in 'production' with GitLab Pages.
  publicPath: process.env.NODE_ENV === 'production' ? '/' + process.env.CI_PROJECT_NAME + '/' : '/'
}
