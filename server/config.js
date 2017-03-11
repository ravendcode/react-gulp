import path from 'path'
// import fs from 'fs'
import {
  normalizePort
} from './utils'

const env = process.env.NODE_ENV || 'development'
// const env = 'production'
const httpPort = normalizePort(process.env.PORT || 80)
const httpsPort = 443
const publicDir = path.join(__dirname, '../public')

let httpsOptions
// if (env === 'development') {
//   httpsOptions = {
//     key: fs.readFileSync(path.join(__dirname, 'ssl/private.key')),
//     cert: fs.readFileSync(path.join(__dirname, 'ssl/certificate.pem'))
//   }
// }

let mongoDbName = process.env.MONGODB_NAME || 'startexpress'

if (process.env.NODE_ENV === 'test') {
  mongoDbName += '_test'
  console.log(`env is ${env}`)
}

// const mongoDbUri = process.env.MONGODB_URI || `mongodb://${mongoDbUser}:${mongoDbPassword}@${mongoDbHost}:${mongoDbPort}/${mongoDbName}`
const mongoDbUri = process.env.MONGODB_URI || `mongodb://localhost/${mongoDbName}`
const salt = process.env.SALT || '$2a$10$gK5iJIrl2/drnIpSOLdWpO'
const host = process.env.HOST || 'app.dev'
const locale = 'ru'

export {
  env,
  httpPort,
  httpsOptions,
  httpsPort,
  mongoDbUri,
  salt,
  host,
  locale,
  publicDir
}
