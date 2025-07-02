import { handleError } from '../middleware/errorHandler.js'
import EstudianteService from '../services/estudiantes.service.js'

export class Estudiantes {
	static async getAllEstudiantes(req, res) {
		try {
			const { page = 1, limit = 10, search } = req.query
			const estudiantes = await EstudianteService.getAllEstudiantes(page, limit, search)
			res.json(estudiantes)
		} catch (error) {
			handleError(res, error)
		}
	}

	static async getEstudianteById(req, res) {
		try {
			const estudiante = await EstudianteService.getEstudianteById(req.params.id)
			if (!estudiante) return res.status(404).json({ message: 'Estudiante no encontrado' })
			res.json(estudiante)
		} catch (error) {
			handleError(res, error)
		}
	}

	static async createEstudiante(req, res) {
		try {
			const nuevoEstudiante = await EstudianteService.createEstudiante(req.body)
			res.status(201).json(nuevoEstudiante)
		} catch (error) {
			handleError(res, error)
		}
	}

	static async updateEstudiante(req, res) {
		try {
			const estudianteActualizado = await EstudianteService.updateEstudiante(req.params.id, req.body)
			if (!estudianteActualizado) return res.status(404).json({ message: 'Estudiante no encontrado' })
			res.json(estudianteActualizado)
		} catch (error) {
			handleError(res, error)
		}
	}

	static async deleteEstudiante(req, res) {
		try {
			const estudianteEliminado = await EstudianteService.deleteEstudiante(req.params.id)
			if (!estudianteEliminado) return res.status(404).json({ message: 'Estudiante no encontrado' })
			res.json({ message: 'Estudiante eliminado correctamente' })
		} catch (error) {
			handleError(res, error)
		}
	}

	static async getEstadisticas(req, res) {
		try {
			const estadisticas = await EstudianteService.getEstadisticas()
			res.json(estadisticas)
		} catch (error) {
			handleError(res, error)
		}
	}
}
