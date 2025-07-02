import { Router } from 'express'
import { Estudiantes } from '../controllers/estudiantes.controller.js'

const router = Router()

router.get('/', Estudiantes.getAllEstudiantes)
router.get('/:id', Estudiantes.getEstudianteById)
//router.post('/', Estudiantes.createEstudiante)
//router.put('/:id', Estudiantes.updateEstudiante)
//router.delete('/:id', Estudiantes.deleteEstudiante)

export default router
