/* eslint-env node */

// ------------------------------------------------------------------------------
// node.js starter application for Bluemix
// ------------------------------------------------------------------------------

// import React from 'react'
// // we'll use this to render our app to an html string
// import { renderToString } from 'react-dom/server'
// // and these to match the url to routes and then render
// import { match, RouterContext } from 'react-router'
// import routes from './app/config/routes'

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express')

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv')

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv()

var path = require('path')
var compression = require('compression')

/* eslint no-console: 0 */

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const config = require('./webpack.config.js')

const isDeveloping = process.env.NODE_ENV !== 'production'
const port = isDeveloping ? 8080 : appEnv.port

// create a new express server
const app = express()


app.use(bodyParser.json())



// Development
if (isDeveloping) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  })
  app.use(express.static(path.join(__dirname, 'app', 'public')))

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  app.get('*', function response (req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'public/index.html')))
    res.end()
  })
} else {
// Production
  app.use(compression())
  app.use(express.static(__dirname + '/dist'))

  app.get('*', function response (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  })
}

app.listen(port, function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
