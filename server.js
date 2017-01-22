import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
var express = require('express')
var path = require('path')
var compression = require('compression')
import getRoutes from './app/config/routes'
import { Provider } from 'react-redux'
import * as reducers from 'redux/modules'
import { routerReducer } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
var app = express()

app.use(compression())
// serve static stuff
app.use(express.static(path.join(__dirname, 'app', 'public')))

// send all requests to index.html
app.get('*', (req, res, next) => {
  const initialState = {}
  const store = createStore(combineReducers({...reducers, routing: routerReducer}), initialState, applyMiddleware(thunk))

  match({ routes: getRoutes(store), location: req.url }, (err, redirect, props) => {
    // in here we can make some decisions all at once
    if (err) {
      // there was an error somewhere during route matching
      res.status(500).send(err.message)
    } else if (redirect) {
      // we haven't talked about `onEnter` hooks on routes, but before a
      // route is entered, it can redirect. Here we handle on the server.
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {

      const components = props.components
      console.log(components)
      const appHtml = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      )
      const state = store.getState()
      res.send(renderPage(appHtml, state))
      // })
      .catch((err) => next(err))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('404 Not Found')
    }
  })
})
function renderPage (appHtml, state) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>feedemot</title>
    <div id=app>${appHtml}</div>
    <script>window.__REDUX_STATE__ = ${JSON.stringify(state)}</script>
    <script src="/index_bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
	console.log('Production Express server running at localhost:' + PORT)
})
