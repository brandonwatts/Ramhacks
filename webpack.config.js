module.exports = {
  entry: "./index.jsx",
  output: {
    filename: "out/bundle.js"
  },
  module: {
   loaders: [
     {
       test: /\.jsx$/,
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015']
       }
     }
   ]
 }
}
