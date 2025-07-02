import { SmeEstudianteService } from '../services/sme_nuevos_estu.service.js'

export class smeEstudiantes {
	static async getAll(req, res) {
		try {
			const { page = 1, limit = 10, search = '' } = req.query
			const result = await SmeEstudianteService.getAll(page, limit, search)
			res.json(result)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	static async getAll2025(req, res) {
		try {
			const { page = 1, limit = 10, search = '' } = req.query
			const result = await SmeEstudianteService.getAll2025(page, limit, search)
			res.json(result)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	static async getByCedula(req, res) {
		try {
			const { cedula } = req.params
			const { is2025 } = req.query
			const estudiante = await SmeEstudianteService.getByCedula(cedula, is2025 === 'true')
			if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' })
			res.json(estudiante)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	static async create(req, res) {
		try {
			const { is2025, ...data } = req.body
			const nuevoEstudiante = await SmeEstudianteService.create(data, is2025)
			res.status(201).json(nuevoEstudiante)
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	static async update(req, res) {
		try {
			const { cedula } = req.params
			const { is2025, ...data } = req.body
			const estudiante = await SmeEstudianteService.update(cedula, data, is2025)
			if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' })
			res.json(estudiante)
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	static async delete(req, res) {
		try {
			const { cedula } = req.params
			const { is2025 } = req.query
			const estudiante = await SmeEstudianteService.delete(cedula, is2025 === 'true')
			if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' })
			res.json({ message: 'Estudiante eliminado' })
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	static async estadisticas(req, res) {
		try {
			const stats = await SmeEstudianteService.getEstadisticas()
			res.json(stats)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}
