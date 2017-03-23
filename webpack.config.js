const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const AssetsPlugin = require('assets-webpack-plugin');

const dist = path.join(__dirname, 'dist');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  client: path.join(dist, 'client'),
  assets: path.join(__dirname, 'assets'),
  public: process.env.CDN_ENDPOINT || 'http://localhost:8081/'
};

const loaders = [
  {
    test: /\.js$/,
    include: [
      path.join(__dirname, "src")
    ],
    loader: 'babel-loader',
    query: {
      presets: ['react','es2015'],
      cacheDirectory: true
    }
  },
  {
    test: /\.scss$/, 
    include: /src/,
    loader: ExtractTextPlugin.extract('css-loader!sass-loader?sourceMap')
  },
  {
    test:   /\.svg$/i,
    loader: 'file-loader',
    include: /src/,
    query: {
      name: 'static/svg/[name]-[sha512:hash:base64:7].[ext]',
      publicPath: PATHS.public
    }
  },
  {
    test:   /\.(png|gif|jpe?g)$/i,
    loader: 'url-loader',
    include: /src/,
    query: {
      limit: 500000,
      name: 'static/img/[name]-[sha512:hash:base64:7].[ext]',
      publicPath: PATHS.public
    }
  }
];

const assetsPluginInstance = new AssetsPlugin({path: PATHS.dist, filename: 'assets-manifest.json'});

const plugins = [
  new WebpackMd5Hash(),
  new ExtractTextPlugin({ filename: 'static/css/style.[chunkhash].css', allChunks: true }),
  assetsPluginInstance,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development'
  }),
  new WebpackMd5Hash(),
  new ExtractTextPlugin({ filename: 'css/style.[hash].css', allChunks: true }),
  assetsPluginInstance  
].concat(process.env.NODE_ENV === 'production' ? [
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      warnings: true
    }
  })
] : []);

const serverConfiguration = {
  name: 'server',
  entry: { server: [PATHS.src + '/server.js']},
  target: 'node',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  output: {
    path: PATHS.client,
    filename: '../server.js',
    libraryTarget: 'commonjs2',
    publicPath: PATHS.public
  },
  externals: /^[a-z\-0-9]+$/,
  module: { loaders: loaders },
  plugins: plugins.concat([
    new webpack.NormalModuleReplacementPlugin(/\.(css|scss)$/, 'node-noop')
  ])
}

const clientConfiguration = {
  name: 'client',
  cache: true,
  entry: { client: [PATHS.src + '/client.js']},
  target: 'web',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  output: {
    path: PATHS.client,
    filename: 'js/client.[hash].js',
    sourceMapFilename: '[file].map',
    publicPath: PATHS.public
  },
  module: { 
    loaders: loaders
  },
  plugins: plugins.concat([
    new webpack.EnvironmentPlugin({
      BROWSER: 'true'
    })
  ])
};

module.exports = function(env) {
  return [
    serverConfiguration,
    clientConfiguration
  ];
};
