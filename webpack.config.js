const path = require('path')
const fs = require('fs')
const serverless = require('serverless-webpack')

const walk = function(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      fileList = walk(dir + '/' + file + '/', fileList)
    } else {
      fileList.push(dir + '/' + file)
    }
  })

  return fileList
}

const src = path.resolve(__dirname, 'src')

const assign = (src, dest) => {
  for (let entry of src) {
    dest[entry] = entry
  }

  return dest
}

const entries = assign(walk(path.resolve(src, 'lib')), serverless.lib.entries)

module.exports = {
  entry: entries,
  mode: serverless.lib.webpack.isLocal ? 'development' : 'production',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      src,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
}
