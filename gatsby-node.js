const path = require(`path`)

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (["build-html", "develop-html"].includes(stage)) {
    /*
     * During the build step, `auth0-spa-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don't need it during the build.
     * Using Webpack's null loader, we're able to effectively ignore `auth0-spa-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-spa-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
