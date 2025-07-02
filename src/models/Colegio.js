import { DataTypes } from 'sequelize'
import sequelize from '../config/database.config.js'

const Colegio = sequelize.define(
	'Colegio',
	{
		cod_coleg: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
		},
		nom_coleg: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		provincia_coleg: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		canton_coleg: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		direccion_coleg: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		fono_coleg: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		categoria: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: 'colegio',
		timestamps: false,
	}
)

export default Colegio
