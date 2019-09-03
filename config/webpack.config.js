const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV;
const devMode = (env === 'development');

let config = {
  mode: devMode ? 'development' : 'production',
  entry: {
    ['app']: path.resolve(__dirname, '../app.js'),
  },
  devtool: devMode ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              //css module
              // modules: true,
              // localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: devMode,
        extractComments: 'all'
      }),
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_debugger: !devMode,
            drop_console: !devMode
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new webpack.LoaderOptionsPlugin({ minimize: !devMode }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
    }),
    new CopyPlugin([
      { from: path.join(__dirname, "../public"), to: path.join(__dirname, "../build") },
    ]),
  ],
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
    alias: {
      '@app': path.join(__dirname, '../src/app'),
      '@common': path.join(__dirname, '../src/common'),
      '@pages': path.join(__dirname, '../src/pages'),
      '@styles': path.join(__dirname, '../src/styles'),
    },
  },
  externals: {
    global
  },
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, "build"),
    compress: true,
    host: "0.0.0.0",
    port: 7788,
    hot: true
  },
};

module.exports = config
