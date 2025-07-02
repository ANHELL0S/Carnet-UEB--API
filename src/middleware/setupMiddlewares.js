import cors from 'cors'
import morgan from 'morgan'
import express from 'express'

export const setupMiddlewares = app => {
	app.use(cors())
	app.use(morgan('dev'))
	app.use(express.json())
}
