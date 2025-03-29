import express from 'express'
import path from 'path'
import api from '../api/template'
import auth from '../midlewares/auth'
import handleFacedeExistence from '../midlewares/handleFacadeExistence'
import login from '../api/login'
import logout from '../api/logout'
import report from '../api/report'
import multerConfig from '../config/multer'
import multer from 'multer'

const router = express.Router()

router.use('/static', express.static(path.join(__dirname, '..', 'uploads')))

router.get('/ping', (req, res) => {
  return res.status(200).json({ msg: 'pong' })
})

router.get('/report/:method', report.getReport)
router.post('/login', login.login)
router.post('/logout', logout.insert)

router.get(`/:route`, auth.validate, handleFacedeExistence, api.get)
router.post(`/:route`, auth.validate, multer(multerConfig).any(), handleFacedeExistence, api.insert)
router.put(`/:route/:id`, auth.validate, multer(multerConfig).any(), handleFacedeExistence, api.update)
router.delete(`/:route/:id`, auth.validate, handleFacedeExistence, api.remove)
router.get(`/:route/:id`, auth.validate, handleFacedeExistence, api.getById)

export default router
