var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var entries = getEntry('script/**/*.js',[]);
var config = {
   devtool: "cheap-module-source-map",
  entry: entries,
  output: {
    'path':path.join(__dirname,'public'),
    'publicPath':'/',
    'filename':'script/[name].js'
  },
  module: {
    loaders: [
    {test: /\.js$/, loader: 'babel-loader'},
     {test: /\.(css|less)$/, loader: 'style-loader!css-loader!less-loader'},
     {test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/i,loader: "url-loader?limit=8192&name=images/[name]_[hash].[ext]"},
    ]
  },
  resolve:{
    alias:{editormd:__dirname+'/node_modules/editor.md/editormd.min.js'}
  },
  plugins: [
    new ExtractTextPlugin("style/[name]_[hash].css"),
    new webpack.ProvidePlugin({ //加载jq
      $: 'jquery',
      'jQuery':'jquery',
      'baidu':__dirname+'/node_modules/baidutemplate/baiduTemplate.js'
    })
  ]
}


module.exports = config;

function getEntry(globPath,common){
  var files = glob.sync(globPath),entries={};
  files.forEach(function(item,index,arr){
    const c = [...common]
    var extname = path.extname(item);
    var basename = path.basename(item,extname);
    c.push('./'+item);
    entries[basename] = c;
  })
  return entries;
}
