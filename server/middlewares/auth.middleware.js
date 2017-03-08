const User = require('../models/user')

export default (req, res, next) => {
  let token = req.header('x-auth')
  User.findByToken(token).then((user) => {
    if (!user) {
      let error = new Error('No user with this token')
      error.status = 401
      return Promise.reject(error)
    }
    req.user = user
    req.token = token
    next()
  }).catch((e) => next(e))
}
