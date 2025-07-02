import Colegio from './Colegio.js'
import { DataTypes, Op } from 'sequelize'
import Especialidad from './Especialidad.js'
import sequelize from '../config/database.config.js'

const Estudiante = sequelize.define(
	'Estudiante',
	{
		ced_est: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'La cédula es requerida',
				},
				len: {
					args: [8, 13],
					msg: 'La cédula debe tener entre 8 y 13 caracteres',
				},
			},
		},
		nom_est: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'El nombre es requerido',
				},
				len: {
					args: [2, 100],
					msg: 'El nombre debe tener entre 2 y 100 caracteres',
				},
			},
		},
		apell_est: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'El apellido es requerido',
				},
				len: {
					args: [2, 100],
					msg: 'El apellido debe tener entre 2 y 100 caracteres',
				},
			},
		},
		genero: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isIn: {
					args: [['MASCULINO', 'FEMENINO', 'OTRO']],
					msg: 'El género debe ser MASCULINO, FEMENINO u OTRO',
				},
			},
		},
		fono_est: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: 'El teléfono debe contener solo números',
				},
				len: {
					args: [7, 15],
					msg: 'El teléfono debe tener entre 7 y 15 dígitos',
				},
			},
		},
		fotografia: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pais: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'ECUADOR',
		},
		provincia: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		canton: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		sector: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		fech_nacim: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			validate: {
				isDate: {
					msg: 'Debe ser una fecha válida',
				},
				isBefore: {
					args: new Date().toISOString(),
					msg: 'La fecha de nacimiento no puede ser futura',
				},
			},
		},
		domicilio_est: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nom_pad: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		nom_mad: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lug_trab: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		fono_trab: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isNumeric: {
					msg: 'El teléfono de trabajo debe contener solo números',
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isEmail: {
					msg: 'Debe ser un email válido',
				},
			},
		},
		fech_grad_col: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			validate: {
				isDate: {
					msg: 'Debe ser una fecha válida',
				},
			},
		},
		calificacion: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				min: {
					args: 0,
					msg: 'La calificación no puede ser negativa',
				},
				max: {
					args: 20,
					msg: 'La calificación no puede ser mayor a 20',
				},
			},
		},
		cod_coleg: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		cod_especialidad: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		etnia: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		clave: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		clave_es: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		nick: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: {
				msg: 'El nick debe ser único',
			},
		},
		creado: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		tele_conve: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: 'estudiantes',
		timestamps: false,
		indexes: [
			{ fields: ['nom_est'] },
			{ fields: ['apell_est'] },
			{ fields: ['email'] },
			{ fields: ['nick'] },
			{ fields: ['provincia'] },
			{ fields: ['genero'] },
		],
	}
)

// Definir las asociaciones
Estudiante.belongsTo(Colegio, {
	foreignKey: 'cod_coleg',
	as: 'colegio',
})

Estudiante.belongsTo(Especialidad, {
	foreignKey: 'cod_especialidad',
	as: 'especialidad',
})

// Métodos de instancia
Estudiante.prototype.getNombreCompleto = function () {
	return `${this.nom_est} ${this.apell_est}`.trim()
}

Estudiante.prototype.getEdad = function () {
	if (!this.fech_nacim) return null

	const hoy = new Date()
	const nacimiento = new Date(this.fech_nacim)
	let edad = hoy.getFullYear() - nacimiento.getFullYear()
	const mes = hoy.getMonth() - nacimiento.getMonth()

	if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
		edad--
	}

	return edad >= 0 ? edad : null
}

Estudiante.prototype.getIniciales = function () {
	const nombres = this.nom_est?.split(' ') || []
	const apellidos = this.apell_est?.split(' ') || []

	const inicialNombre = nombres[0]?.charAt(0) || ''
	const inicialApellido = apellidos[0]?.charAt(0) || ''

	return `${inicialNombre}${inicialApellido}`.toUpperCase()
}

Estudiante.prototype.tieneInformacionCompleta = function () {
	const camposRequeridos = ['ced_est', 'nom_est', 'apell_est', 'fono_est', 'email', 'fech_nacim', 'domicilio_est']

	return camposRequeridos.every(campo => this[campo] && this[campo].toString().trim().length > 0)
}

// Métodos estáticos de clase
Estudiante.buscarPorTermino = function (termino, opciones = {}) {
	const whereClause = {
		[Op.or]: [
			{ nom_est: { [Op.iLike]: `%${termino}%` } },
			{ apell_est: { [Op.iLike]: `%${termino}%` } },
			{ ced_est: { [Op.like]: `%${termino}%` } },
			{ email: { [Op.iLike]: `%${termino}%` } },
		],
	}

	return this.findAll({
		where: whereClause,
		attributes: { exclude: ['clave'] },
		...opciones,
	})
}

Estudiante.contarPorGenero = async function () {
	const resultados = await this.findAll({
		attributes: ['genero', [sequelize.fn('COUNT', sequelize.col('genero')), 'total']],
		where: {
			genero: { [Op.not]: null },
		},
		group: ['genero'],
		raw: true,
	})

	return resultados
}

Estudiante.contarPorProvincia = async function (limit = 10) {
	const resultados = await this.findAll({
		attributes: ['provincia', [sequelize.fn('COUNT', sequelize.col('provincia')), 'total']],
		where: {
			provincia: { [Op.not]: null },
		},
		group: ['provincia'],
		order: [[sequelize.literal('total'), 'DESC']],
		limit,
		raw: true,
	})

	return resultados
}

Estudiante.obtenerRangoEdades = async function () {
	const resultado = await this.findAll({
		attributes: [
			[sequelize.fn('MIN', sequelize.col('fech_nacim')), 'fechaMinima'],
			[sequelize.fn('MAX', sequelize.col('fech_nacim')), 'fechaMaxima'],
			[sequelize.fn('COUNT', sequelize.col('fech_nacim')), 'totalConFecha'],
		],
		where: {
			fech_nacim: { [Op.not]: null },
		},
		raw: true,
	})

	return resultado[0] || {}
}

export default Estudiante
