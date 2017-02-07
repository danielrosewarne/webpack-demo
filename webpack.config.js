const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
  assets: path.join(__dirname, 'assets'),
  static: path.join(__dirname, 'static'),
  public: 'http://localhost:8081/'
};

const javascriptLoader = { 
                          test: /\.js$/,
                          exclude: /(node_modules)/,
                          loader: 'babel-loader',
                          query: {
                            presets: ['react','es2015']
                          }
                        };

const serverConfiguration = {
  name: 'server',
  entry: PATHS.src + '/server.js',
  target: 'node',
  output: {
    path: PATHS.build,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: [javascriptLoader]
  },
  plugins: [
    new CleanWebpackPlugin(['build', 'static']),
    new webpack.NormalModuleReplacementPlugin(/\.(css|scss)$/, 'node-noop')
  ]
}

const clientConfiguration = {
  name: 'client',
  entry: PATHS.src + '/client.js',
  output: {
    path: PATHS.static,
    filename: 'js/client.[hash].js',      
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [
      javascriptLoader,
      {
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'sass-loader?sourceMap'] })
      },
      {
        test:   /\.svg$/i,
        loader: 'file-loader',
        query: {
          name: 'svg/[name]-[sha512:hash:base64:7].[ext]',
          publicPath: PATHS.public
        }
      },
      {
        test:   /\.(png|gif|jpe?g)$/i,
        loader: 'url-loader',
        query: {
          limit: 500000,
          name: 'img/[name]-[sha512:hash:base64:7].[ext]',
          publicPath: PATHS.public
        }
      }
    ]
  },
  plugins: [
    new AssetsPlugin({path: path.join(__dirname, 'build')}),
    new WebpackMd5Hash(),
    new ExtractTextPlugin({ filename: 'css/style.[chunkhash].css', allChunks: true })
  ]
};

module.exports = function(env) {
  return [serverConfiguration, clientConfiguration];
};
