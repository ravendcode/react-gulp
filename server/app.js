import path from 'path'
import fs from 'fs'
import express from 'express'
import http from 'http'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import i18n from 'i18n'
import favicon from 'serve-favicon'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import reactRoutes from '../client/app/routes.jsx'
import * as config from './config'
import db from './databases/connections/mongoose'
import routes from './routes'

const app = express()

app.use(compression())

if (config.env === 'development') {
  app.use(morgan('dev'))

  app.all('*', function (req, res, next) {
    if (req.secure) {
      return next()
    }
    res.redirect('https://' + req.hostname + ':' + config.httpsPort + req.url)
  })
  http.createServer(app).listen(config.httpPort)
  // redirect http server
}

i18n.configure({
  locales: ['en', 'ru'],
  defaultLocale: config.locale,
  directory: path.join(__dirname, 'locales'),
  queryParameter: 'lang',
  register: global
})

app.use(favicon(config.publicDir + '/assets/icons/favicon.ico'))
app.use(i18n.init)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())
app.use(express.static(config.publicDir))

if (config.env === 'development') {
  // Seeds

}

// Middlewares
app.use((req, res, next) => {
  req.db = db

  app.locals.app = {
    env: config.env,
    httpPort: config.httpPort,
    httpsPort: config.httpsPort,
    host: config.host,
    locale: res.getLocale()
  }

  next()
})

// app.use(require('./middlewares/log.middleware').default)

// Routes
routes(app)

app.get('*', (req, res, next) => {
  // res.sendFile(config.publicDir + '/index.html')
  match({ routes: reactRoutes, location: req.url }, (err, redirect, props) => {
    if (err) {
      return next(err)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props} />)

      renderPage(appHtml).then((data) => {
        res.send(data)
      }).catch((e) => next(e))
    } else {
      // no errors, no redirect, we just didn't match anything
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return new Promise((resolve, reject) => {
    fs.readFile(config.publicDir + '/index.html', 'utf8', (err, contents) => {
      if (err) {
        reject(err)
      } else {
        let result = contents.replace(/<div id="app"><\/div>/, `<div id="app">${appHtml}</div>`)
        resolve(result)
      }
    })
  })
}

// Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   var err = new Error(req.__('error.not found'))
//   err.status = 404
//   next(err)
// })

// Error handler
app.use((err, req, res, next) => {
  let message = err.message
  let status = err.status || 500
  let error = {
    message,
    status
  }
  if (config.env === 'development' && status !== 404) {
    error.stack = err.stack
  }
  res.status(status).send({
    error
  })
})

export default app
