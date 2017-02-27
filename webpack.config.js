const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');
const webpack = require('webpack');

module.exports = { // eslint-disable-line
  devtool: 'source-map',
  entry: {
    // engine: './src/engine/index.ts',
    game: './src/game/index.ts',
    vendor: 'gl-matrix',
  },
  module: {
    rules: [
      // All files with a '.ts' extension will be
      // handled by 'awesome-typescript-loader'.
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new CheckerPlugin(),
  ],
};
