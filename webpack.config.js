module.exports = { // eslint-disable-line
  devtool: 'source-map',
  entry: './index',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  output: {
    path: __dirname + '/dist', // eslint-disable-line
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js'],
  },
};
