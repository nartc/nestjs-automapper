import { ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPlugin';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import { resolveTsAliases } from 'resolve-ts-aliases';
import webpack from 'webpack';

const TerserPlugin = require('terser-webpack-plugin');
const isProduction =
  typeof process.env.NODE_ENV !== 'undefined' &&
  process.env.NODE_ENT === 'prod';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';

const webpackConfig: webpack.Configuration = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false
      })
    ]
  },
  target: 'node',
  mode,
  devtool,
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100']
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: resolveTsAliases(path.resolve('tsconfig.json'))
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.ts'
      }
    })
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  }
};

export default webpackConfig;
