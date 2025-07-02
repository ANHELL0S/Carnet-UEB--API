import app from './src/config/app.config.js'
import { connectDatabase } from './src/config/database.config.js'

const PORT = process.env.PORT || 3000

const startServer = async () => {
	try {
		console.log('\n> CONNECT DB\n')

		// Conectar a la base de datos
		await connectDatabase()

		// Iniciar el servidor
		const server = app.listen(PORT, () => {
			console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
		})

		// Manejar cierre graceful
		process.on('SIGTERM', () => {
			console.log('SIGTERM recibido, cerrando servidor...')
			server.close(() => {
				console.log('Servidor cerrado')
			})
		})

		process.on('SIGINT', () => {
			console.log('SIGINT recibido, cerrando servidor...')
			server.close(() => {
				console.log('Servidor cerrado')
				process.exit(0)
			})
		})

		console.log('\n> SERVIDOR INICIADO EXITOSAMENTE\n')
	} catch (error) {
		console.error('❌ Error al iniciar el servidor:', error.message)
		console.error('Stack trace:', error.stack)
		process.exit(1)
	}
}

startServer()
	.then(() => {
		console.log('startServer completado')
	})
	.catch(error => {
		console.error('Error en startServer:', error)
		process.exit(1)
	})
