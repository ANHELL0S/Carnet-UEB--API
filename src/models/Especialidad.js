import { DataTypes } from 'sequelize'
import sequelize from '../config/database.config.js'

const Especialidad = sequelize.define(
	'Especialidad',
	{
		cod_especialidad: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		nombre_especialidad: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tipo: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: 'especialidades',
		timestamps: false,
	}
)

export default Especialidad
