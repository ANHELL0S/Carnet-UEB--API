import estudiantesRouter from './estudiantes.routes.js'
import smeEstudiantesRouter from './smeEstudiantes.routes.js'

export const setupRoutes = app => {
	app.use('/v1/api/estudiantes', estudiantesRouter)
	app.use('/v1/api/sme/estudiantes', smeEstudiantesRouter)
}
