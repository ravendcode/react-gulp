import express from 'express'

const router = express.Router()

router.get('/test', (req, res) => {
  res.send('test')
})

router.get('/error', (req, res) => {
  res.status(500).send({error: {message: 'Error', status: 500}})
})

export default router
