const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const copyImages = require('copy-webpack-plugin');
const porser = require('dotenv-webpack');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  mode:'development',
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
            test: /\.m?js$/,//Expresión Regular: usa cualquier mjs o js el ,'?' sirve para decir el O
            exclude: /node_modules/,    //Excluye esta carpeta
            use: {
                loader: 'babel-loader'  //Indica qué loader usarás
            }
        },
        {
          test: /\.css$/i,//se pueden agregar preProcesadores como SASSAS
          use: [MiniCssExtractPlugin.loader,  
              'css-loader'
          ] ,  //Esta configuración depende del plugin en sí
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: 'asset/resource'
        //generator: {filename: 'static/images/[hash][ext][query]'}  salida 
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        inject: true,       //Inyecta el bundle al template HTML
        template: './public/index.html',    //El template que toma como referencia
        filename: './index.html'    //Nombre del archivo que se genera en dist
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
  }),
    new copyImages({
      patterns: [
          {
              from: path.resolve(__dirname, "src", "assets/images"),
              to: "assets/images"
          }
      ]
  }),
  new porser(),
  

  ],
}
