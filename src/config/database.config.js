import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

// Cargar variables de entorno según el entorno actual
const currentEnv = process.env.NODE_ENV || 'development'

// Seleccionar el archivo .env correcto según el entorno
dotenv.config({
	path: `.env.${currentEnv}`,
})

// Configuración de la base de datos por entorno
const dbConfig = {
	development: {
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DIALECT,
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		define: {
			timestamps: false,
			freezeTableName: true,
			underscored: false,
		},
	},
	production: {
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DIALECT,
		logging: false,
		pool: {
			max: 10,
			min: 2,
			acquire: 30000,
			idle: 10000,
		},
		define: {
			timestamps: false,
			freezeTableName: true,
			underscored: false,
		},
		dialectOptions: {
			ssl:
				process.env.DB_SSL === 'true'
					? {
							require: true,
							rejectUnauthorized: false,
					  }
					: false,
		},
	},
	test: {
		database: process.env.DB_NAME_TEST,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DIALECT,
		logging: false,
	},
}

// Obtener configuración actual
const config = dbConfig[currentEnv]

// Crear instancia de Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// Función para conectar a la base de datos
export const connectDatabase = async () => {
	try {
		await sequelize.authenticate()
		console.log('✅ Conexión a PostgreSQL establecida correctamente')
		console.log(`📊 Base de datos: ${config.database}`)
		console.log(`🏠 Host: ${config.host}:${config.port}`)
		console.log(`👤 Usuario: ${config.username}`)
		console.log(`🌍 Entorno: ${currentEnv}`)

		return sequelize
	} catch (error) {
		console.error('❌ Error al conectar con PostgreSQL:', error)
		throw error
	}
}

// Función para cerrar la conexión
export const closeDatabase = async () => {
	try {
		await sequelize.close()
		console.log('🔐 Conexión a PostgreSQL cerrada correctamente')
	} catch (error) {
		console.error('❌ Error al cerrar la conexión:', error)
		throw error
	}
}

// Función para verificar la conexión
export const testConnection = async () => {
	try {
		await sequelize.authenticate()
		return true
	} catch (error) {
		console.error('❌ Error en la conexión:', error)
		return false
	}
}

export { sequelize }
export default sequelize
