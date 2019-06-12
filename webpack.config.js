const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const webpackMerge = require('webpack-merge');
const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

var path = require('path');
var SRC_DIR = path.resolve(__dirname,'src');

module.exports = ({ mode, presets }) => {
  return webpackMerge({
    entry: SRC_DIR + '/app.js',
    mode,
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist']
      }),
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html'
      }),
      new CopyWebpackPlugin([{
        from: 'src/img/icons', to: 'img/icons'
      }],
      {
        ignore: ['.DS_Store']
      })
    ]
  },
  modeConfig({ mode, presets }),
  loadPresets({ mode, presets }));
};