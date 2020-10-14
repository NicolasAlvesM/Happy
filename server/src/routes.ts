import {Router} from 'express'
import multer from 'multer'
import uploadConf from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'

const routes=Router()
const upload=multer(uploadConf)
routes.get('/orphanages',OrphanagesController.index)
routes.get('/orphanage/:id',OrphanagesController.show)
routes.post('/orphanages',upload.array('images'),OrphanagesController.create)
export default routes