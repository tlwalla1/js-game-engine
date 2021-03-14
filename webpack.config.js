const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const path = require('path');

module.exports = { // eslint-disable-line
  entry: {
    // engine: './src/engine/index.ts',
    game: './game/index.ts',
    vendor: 'gl-matrix',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // eslint-disable-line
    // publicPath: './',
    filename: '[name].bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './game/assets', to: 'assets' },
        { from: './src/glslshaders', to: 'src/glslshaders' }
      ],
    }),
    new HtmlWebpackPlugin({ template: './game/index.html' }),
    new HtmlWebpackTagsPlugin({ tags: ['assets/reset.css']}),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};
