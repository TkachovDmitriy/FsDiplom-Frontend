const path = require('path')
const {
  override,
  addWebpackAlias,
  addBabelPlugin,
  addWebpackModuleRule
} = require('customize-cra')

module.exports = override(
  addWebpackAlias({
    '~': path.resolve(__dirname, 'src')
  }),
  addBabelPlugin('@babel/plugin-transform-typescript'),
  addWebpackModuleRule({
    test: /\.(woff(2)?|ttf|woff)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  })
)
