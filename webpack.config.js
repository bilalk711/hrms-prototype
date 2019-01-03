var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var path = require('path')

module.exports = {
     context: __dirname,
     entry: "./index-client.js",
     output: {
     path: __dirname + '/assets',
     filename: "bundle.js"
     },
     module: {
         rules: [
           {
             test: /\.(png|jpg|gif)$/,
             use: [
               {
                 loader: 'file-loader',
                 options: {},
               },
             ],
           },
           {
           test: /\.js$/,
           exclude: /(node_modules)/,
           loader: 'babel-loader',
             query: {
             presets: ['env', 'stage-0', 'react']
             }
           },
               {
             test: /\.css$/,
             use: [
               { loader: "style-loader" },
               { loader: "css-loader" }
             ]
           }
      ]
    }
}
