const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


const htmlPlugin = new HtmlWebpackPlugin({
  template:  path.join(__dirname, '/src/index.html')
});

const hotModule = new webpack.HotModuleReplacementPlugin();

// Extract css into external file
const miniCssExtract = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].css'
});

// Minify CSS
const optimizeCssPlugin = new OptimizeCssAssetsPlugin({
  cssProcessorOptions: { discardComments: { removeAll: true } },
  canPrint: true
});

// Clean '/dist' directory with every build
const cleanWeback = new CleanWebpackPlugin(['dist']);

module.exports = (env, argv) => {

  const devMode = argv.mode !== 'production';

  return {
    mode: devMode ? 'development' : 'production',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader }, // fallback to style-loader in development
          { 
            loader: 'css-loader', // translates CSS into CommonJS
            options:   {
              modules: true,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' } // compiles Sass to CSS
        ]
      }, 
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
              // publicPath: 'assets/img/',
              outputPath: 'assets/img/'
            }  
          }
        ]
      }]
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.css']
    },
    plugins: [htmlPlugin, hotModule, miniCssExtract, cleanWeback, optimizeCssPlugin],
    devtool: devMode ? 'source-maps' : 'eval',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 5000,
      hot: true
    }
  }
};