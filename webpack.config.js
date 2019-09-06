const { resolve, join } = require('path')
const { readdirSync, statSync } = require('fs')

const SRC_RELATIVE_PATH = './src'

const walk = function(dir, fileList = []) {
  const files = readdirSync(dir)

  files.forEach(function(file) {
    const filePath = join(dir, file)

    if (statSync(filePath).isDirectory()) {
      fileList = walk(filePath, fileList)
    } else {
      fileList.push(filePath.replace(/\.[^/.]+$/, ''))
    }
  })

  return fileList
}

const toObject = array => {
  return array.reduce((acc, next) => {
    acc[next] = next
    return acc
  }, {})
}

module.exports = {
  entry: Object.assign({}, toObject(walk(SRC_RELATIVE_PATH))),
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      src: resolve(__dirname, SRC_RELATIVE_PATH),
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
