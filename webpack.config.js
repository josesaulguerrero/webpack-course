const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const cssMinimizer = require('css-minimizer-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv-webpack');
// const copyWebpack = require('copy-webpack-plugin');

module.exports = {
   mode: 'production',
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
      // assetModuleFilename: 'assets/images/[hash][ext]',
   },
   resolve: {
      extensions: ['.js'],
      alias: {
         '@utils': path.resolve(__dirname, 'src/utils/'),
         '@templates': path.resolve(__dirname, 'src/templates/'),
         '@styles': path.resolve(__dirname, 'src/styles/'),
         '@images': path.resolve(__dirname, 'src/assets/images/'),
      }
   },
   module: {
      rules: [
         {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            },
         },
         {
            test: /\.s?css$/i,
            use: [
               miniCssExtractPlugin.loader,
               'css-loader',
               'sass-loader',
            ],
         },
         {
            test: /\.png$/,
            type: 'asset/resource',
            generator: {
               filename: 'assets/images/[hash][ext]',
            },
         },
         {
            test: /\.(woff|woff2)$/,
            type: 'asset/resource',
            generator: {
               filename: 'assets/fonts/[name].[contenthash][ext]',
            },
         },
         // {
         //    test: /\.(woff|woff2)$/,
         //    use: {
         //       loader: 'url-loader',
         //       options: {
         //          limit: 10000,
         //          mimetype: 'application/font-woff',
         //          name: '[name].[ext]',
         //          outputPath: 'assets/fonts/',
         //          publicPath: 'assets/fonts/',

         //       }
         //    }
         // },
      ]
   },
   plugins: [
      new htmlWebpackPlugin({
         inject: true,
         template: './public/index.html',
         filename: './index.html'
      }),
      new miniCssExtractPlugin({
         filename: 'assets/styles/[name].[contenthash].css'
      }),
      new dotenv(),
      // new copyWebpack({
      //    patterns: [
      //       {
      //          from: path.resolve(__dirname, "src", "assets/images"),
      //          to: "assets/images",
      //       }
      //    ]
      // }),
   ],
   optimization: {
      minimize: true,
      minimizer: [
         new cssMinimizer(),
         new terserPlugin()
      ]
   }
}
