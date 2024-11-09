import express from 'express'
import cors from 'cors'
import api from '../api/template'
import auth from '../midlewares/auth'
import handleFacedeExistence from '../midlewares/handleFacadeExistence'
const path = require('path')
import login from '../api/login'
import logout from '../api/logout'
import graph from '../api/graph'
require('dotenv').config()



const router = express.Router()

router.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*")
  //res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', '*')
  router.use(cors())
  next()
})

router.get('/ping', (req, res) => {
  return res.status(200).json({ msg: 'pong' })
})

router.post('/login', login.insert)

router.get('/graph/getCounts', graph.get)



router.post('/logout', logout.insert)

router.get(`/:route`, auth.validate, handleFacedeExistence, api.get)

router.post(`/:route`, auth.validate, handleFacedeExistence, api.insert)

router.put(`/:route/:id`, auth.validate, handleFacedeExistence, api.update)

router.delete(`/:route/:id`, auth.validate, handleFacedeExistence, api.remove)
router.get(`/:route/:id`, auth.validate, handleFacedeExistence, api.getById)

export default router
