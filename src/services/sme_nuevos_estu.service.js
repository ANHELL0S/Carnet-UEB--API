import { Op } from 'sequelize'
import NuevoEstudiante from '../models/Sme_nuevos_estu.js'
import NuevoEstudiante2025 from '../models/Sme_nuevos_estu25.js'

export class SmeEstudianteService {
	static async _getAll(model, page = 1, limit = 10, search = '') {
		const offset = (page - 1) * limit

		const whereClause = search
			? {
					[Op.or]: [
						{ nombres: { [Op.iLike]: `%${search}%` } },
						{ apellidos: { [Op.iLike]: `%${search}%` } },
						{ cedula: { [Op.like]: `%${search}%` } },
						{ email: { [Op.iLike]: `%${search}%` } },
						{ n_carr: { [Op.iLike]: `%${search}%` } },
					],
			  }
			: {}

		const { count, rows } = await model.findAndCountAll({
			where: whereClause,
			limit: parseInt(limit),
			offset: offset,
			order: [['apellidos', 'ASC']],
		})

		return {
			total: count,
			page: parseInt(page),
			totalPages: Math.ceil(count / limit),
			estudiantes: rows,
		}
	}

	static async getAll(page, limit, search) {
		return this._getAll(NuevoEstudiante, page, limit, search)
	}

	static async getAll2025(page, limit, search) {
		return this._getAll(NuevoEstudiante2025, page, limit, search)
	}

	static async getByCedula(cedula, is2025 = false) {
		const model = is2025 ? NuevoEstudiante2025 : NuevoEstudiante
		return model.findOne({
			where: { cedula },
		})
	}

	static async create(data, is2025 = false) {
		const model = is2025 ? NuevoEstudiante2025 : NuevoEstudiante
		return model.create(data)
	}

	static async update(cedula, data, is2025 = false) {
		const model = is2025 ? NuevoEstudiante2025 : NuevoEstudiante
		const estudiante = await model.findByPk(cedula)
		if (!estudiante) return null
		return estudiante.update(data)
	}

	static async delete(cedula, is2025 = false) {
		const model = is2025 ? NuevoEstudiante2025 : NuevoEstudiante
		const estudiante = await model.findByPk(cedula)
		if (!estudiante) return null
		await estudiante.destroy()
		return estudiante
	}

	static async getEstadisticas() {
		const [porGenero, porCarrera] = await Promise.all([
			NuevoEstudiante.count({ group: ['genero'] }),
			NuevoEstudiante.count({ group: ['n_carr'] }),
		])

		return { porGenero, porCarrera }
	}
}
