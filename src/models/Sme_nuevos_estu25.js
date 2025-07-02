import { DataTypes } from 'sequelize'
import sequelize from '../config/database.config.js'

const NuevoEstudiante2025 = sequelize.define(
	'NuevoEstudiante2025',
	{
		cedula: {
			type: DataTypes.STRING(15),
			primaryKey: true,
			allowNull: false,
		},
		nombres: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		apellidos: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		genero: {
			type: DataTypes.ENUM('Femenino', 'FEMENINO', 'Masculino', 'MASCULINO'),
			allowNull: false,
		},
		etnia: {
			type: DataTypes.STRING(50),
			allowNull: true,
		},
		celular: {
			type: DataTypes.STRING(15),
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true,
			validate: {
				isEmail: true,
			},
		},
		n_carr: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		modalidad: {
			type: DataTypes.ENUM('HIBRIDA', 'LINEA', 'PRESENCIAL'),
			allowNull: false,
		},
		paralelo: {
			type: DataTypes.STRING(2),
			allowNull: false,
		},
		perdida: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		profecional: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		cod_carr: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		periodo: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		malla: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: 'sme_nuevos_estu25',
		timestamps: false,
	}
)

export default NuevoEstudiante2025
