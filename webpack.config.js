const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = { // eslint-disable-line
  devtool: 'source-map',
  entry: './index',
  module: {
    loaders: [
      // All files with a '.ts' extension will be
      // handled by 'awesome-typescript-loader'.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
    ],

    preLoaders: [
        // All output '.js' files will have any
        // sourcemaps re-processed by 'source-map-loader'.
        {
          test: /\.js$/,
          loader: 'source-map-loader',
        },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // eslint-disable-line
    publicPath: '/bundle/',
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['', '.tsx', '.ts', '.js'],
  },
  plugins: [
    new CheckerPlugin(),
  ],
};
