const path = require('path')
const fs = require('fs')
const serverless = require('serverless-webpack')

const walk = function(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach(function(file) {
    const filePath = dir + '/' + file

    if (fs.statSync(filePath).isDirectory()) {
      fileList = walk(filePath, fileList)
    } else {
      fileList.push('src' + filePath.split('src')[1].replace(/\.[^/.]+$/, ''))
    }
  })

  return fileList
}

const srcPath = path.resolve(__dirname, 'src')

const assign = (src, dest) => {
  for (let entry of src) {
    dest[entry] = entry
  }

  return dest
}

const entries = assign(
  walk(path.resolve(srcPath, 'lib')),
  serverless.lib.entries
)

module.exports = {
  entry: entries,
  mode: serverless.lib.webpack.isLocal ? 'development' : 'production',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      src: srcPath,
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
