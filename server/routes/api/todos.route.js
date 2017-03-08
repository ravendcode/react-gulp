import express from 'express'

const router = express.Router()

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  if (id === '404') {
    // let error = new Error(req.__('error.todo not found'))
    // error.status = 404
    // return next(error)
    return res.sendStatus(404)
  }
  if (id === '500') {
    return res.sendStatus(500)
  }
  res.send({todo: {id}})
})

export default router
