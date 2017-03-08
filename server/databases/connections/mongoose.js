import mongoose from 'mongoose'
import {env, mongoDbUri} from '../../config'

const debug = require('debug')('app:mongodb')

// mongoose.connect(mongoDbUri, {
//     auth: {
//         authdb: 'admin'
//     }
// })

mongoose.Promise = global.Promise
mongoose.connect(mongoDbUri, {config: {autoIndex: env !== 'production'}})

if (env === 'development') {
  mongoose.set('debug', true)
}

const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'))
db.once('open', function () {
  debug('connection success')
})

export default db
