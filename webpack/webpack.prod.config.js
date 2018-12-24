/* eslint-disable import/no-extraneous-dependencies,prefer-template */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
  mode: 'production',
  entry: {
    main: [
      // the entry point of our app
      './src/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, '../__build__new', 'default'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: '/',
    globalObject: 'this',
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.(ttf|png|jpg|jpeg(2)?)(\?[a-z0-9]+)?$/,
        use: [
          { loader: 'file-loader' },
        ],
      },
      {
        test: /\.html$/,
        loader: 'url-loader',
        exclude: [/index.html/],
      },
      {
        test: /\.css$/,
        exclude: [/global.css/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
        ],
      },
      {
        test: [/global.css/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },

    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      'node_modules',
      path.join(__dirname, '../core/src'),
    ],
    cacheWithContext: false,
  },
  parallelism: 10,
  performance: {
    hints: 'warning',
  },
  target: 'web',
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
    ],
    // minimize: false,
    runtimeChunk: true,
    removeEmptyChunks: true,
    removeAvailableModules: true,
    occurrenceOrder: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    },
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('Progress', (compilation) => {
          console.log(`\n Compilation took ${((compilation.endTime - compilation.startTime) / 1000)} s`);
        });
      },
    },
    // new LodashModuleReplacementPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        NO_AUTH: process.env.NO_AUTH ? process.env.NO_AUTH : false,
        APP_PLATFORM: JSON.stringify(process.env.APP_PLATFORM || 'ide'),
      },
    }),
    new webpack.ProgressPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/, /lodash/, /immutable/, /react/, /eva/, 'brace'),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
      chunksSortMode: 'dependency',
    }),
    new CompressionPlugin({
      minRatio: 0.8,
    }),

    new CopyWebpackPlugin([
      { from: 'src/assets/favicon.png', to: 'favicon.png' },
    ], { copyUnmodified: true }),
  ],
  externals: [
    'css-loader',
    'postcss-loader',
    'precss',
  ],
});
