import express from 'express'
import { smeEstudiantes } from '../controllers/smeEstudiantes.controller.js'

const router = express.Router()

router.get('/', smeEstudiantes.getAll)
router.get('/2025', smeEstudiantes.getAll2025)
router.get('/:cedula', smeEstudiantes.getByCedula)
//router.post('/', smeEstudiantes.create)
//router.put('/:cedula', smeEstudiantes.update)
//router.delete('/:cedula', smeEstudiantes.delete)
//router.get('/estadisticas/generales', smeEstudiantes.estadisticas)

export default router
