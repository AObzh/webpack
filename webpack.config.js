const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const getFileName = () => (isProd ? '[name].[contenthash]' : '[name]');
const getOptimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };
  if (isProd) {
    config.minimize = isProd;
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }
  return config;
};

module.exports = {
  devtool: isDev ? 'source-map' : false,
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${getFileName()}.bundle.js`,
  },
  plugins: [
    new ESLintPlugin(),
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon.ico'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
  ],
  // Aliases & extensions
  resolve: {
    extensions: ['.js', 'json', '.css', '.csv'],
    alias: {
      '@root': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimization: getOptimization(),
  devServer: {
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(svg|png)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[hash][ext]',
        },
      },
      {
        test: /\.(csv)$/i,
        use: ['csv-loader'],
        generator: {
          filename: 'files/[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext]',
        },
      },
      //   {
      //     test: /\.(png|jpe?g|gif|svg)$/i,
      //     use: [
      //       {
      //         loader: 'file-loader',
      //       },
      //     ],
      //   },
    ],
  },
};
