// Middleware de manejo de errores global
export const errorHandler = (err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({ message: 'Error interno del servidor' })
}

// Función para manejar errores específicos de Sequelize
export const handleError = (res, error) => {
	if (error.name === 'SequelizeValidationError') {
		const errors = error.errors.map(err => ({
			field: err.path,
			message: err.message,
		}))
		return res.status(400).json({ errors })
	}

	if (error.name === 'SequelizeUniqueConstraintError') {
		const errors = error.errors.map(err => ({
			field: err.path,
			message: 'El valor debe ser único',
		}))
		return res.status(400).json({ errors })
	}

	res.status(500).json({ message: 'Error interno del servidor' })
}
