const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';
const isOnServer = isProduction || isStaging;

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const productionPlugins = [
  // new BundleAnalyzerPlugin(),
  new MiniCssExtractPlugin({
    filename: 'primo_explore_search_embed.min.css'
  }),
];
const devPlugins = [

];

module.exports = {
  context: path.resolve(__dirname, 'js'),
  entry: {
    app: [
      './index.js',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  devtool: isProduction || isStaging ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.scss$/,
          use: [
            isOnServer ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        // custom loader for config.yml
        {
          test: /config\.yml$/,
          use: [
            {
              loader: path.resolve(__dirname, 'webpack-loaders/config-loader.js'),
              options: {
                production: {
                  bobcatUrl: "http://bobcat.library.nyu.edu"
                },
                staging: {
                  bobcatUrl: "http://bobcatdev.library.nyu.edu"
                },
                development: {
                  bobcatUrl: "http://bobcatdev.library.nyu.edu"
                }
              }
            }
          ]
        },
      ],
  },
  plugins: [
    new VueLoaderPlugin(),
    ...(isOnServer ? productionPlugins : devPlugins)
  ]
};
