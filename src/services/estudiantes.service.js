import { Op } from 'sequelize'
import Estudiante from '../models/Estudiante.js'

export default class EstudianteService {
	static async getAllEstudiantes(page = 1, limit = 10, search = '') {
		const offset = (page - 1) * limit

		const whereClause = search
			? {
					[Op.or]: [
						{ nom_est: { [Op.iLike]: `%${search}%` } },
						{ apell_est: { [Op.iLike]: `%${search}%` } },
						{ ced_est: { [Op.like]: `%${search}%` } },
						{ email: { [Op.iLike]: `%${search}%` } },
					],
			  }
			: {}

		const { count, rows } = await Estudiante.findAndCountAll({
			where: whereClause,
			limit: parseInt(limit),
			offset: offset,
			attributes: { exclude: ['clave'] },
			order: [['apell_est', 'ASC']],
			include: [
				{
					association: 'colegio',
				},
				{
					association: 'especialidad',
				},
			],
		})

		return {
			total: count,
			page: parseInt(page),
			totalPages: Math.ceil(count / limit),
			estudiantes: rows,
		}
	}

	static async getEstudianteById(id) {
		return await Estudiante.findByPk(id, {
			attributes: { exclude: ['clave'] },
			include: [
				{
					association: 'colegio',
				},
				{
					association: 'especialidad',
				},
			],
		})
	}

	static async createEstudiante(estudianteData) {
		return await Estudiante.create(estudianteData)
	}

	static async updateEstudiante(id, estudianteData) {
		const estudiante = await Estudiante.findByPk(id)
		if (!estudiante) return null
		return await estudiante.update(estudianteData)
	}

	static async deleteEstudiante(id) {
		const estudiante = await Estudiante.findByPk(id)
		if (!estudiante) return null
		await estudiante.destroy()
		return estudiante
	}

	static async getEstadisticas() {
		const [porGenero, porProvincia, edades] = await Promise.all([
			Estudiante.contarPorGenero(),
			Estudiante.contarPorProvincia(),
			Estudiante.obtenerRangoEdades(),
		])

		return {
			porGenero,
			porProvincia,
			edades,
		}
	}
}
