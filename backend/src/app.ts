import express, { NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import knex from 'knex'
import cors from 'cors'
import { errorHandler } from './utils'
import { NotFoundError } from './errors'
import { PRODUCTION, JWT_SECRET, REFRESH_JWT_SECRET } from './constants'
import routes from './routes'
import { databaseConfig } from './config'
import HTTP_CODE from './errors/httpCodes'
import bmiRoutes from './routes/bmiRoutes'

// Environment execution info
console.log(`Running in ${PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'} mode\n`)

// Test database connection
const knexConnection = knex(databaseConfig)
knexConnection.raw(`
SELECT table_name
FROM information_schema.tables
WHERE table_schema='public';
`)
  .then((data) => {
    console.log(data.rows)
    console.log('\nDatabase connection successful\n')
  })
  .catch((error) => {
    console.error('\nDatabase connection error')
    console.error(error)
  })

// Start express app
const app = express()

app.set('JWT_SECRET', JWT_SECRET)
app.set('REFRESH_JWT_SECRET', REFRESH_JWT_SECRET)

app.disable('x-powered-by')

// MIDDLEWARE SETUP (Must come before routes)
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())  // This MUST come before routes that parse JSON
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

export const API_PREFIX = '/api'


// ROUTES SETUP (After middleware)
app.use(`${API_PREFIX}/public`, express.static('public'))
app.use(`${API_PREFIX}/uploads`, express.static('uploads'))

// Test routes
app.get('/test-direct', (req: Request, res: Response) => {
  res.json({
    message: 'Direct route works!',
    timestamp: new Date(),
    path: req.path
  })
})

app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    message: 'API test route works!',
    timestamp: new Date(),
    path: req.path
  })
})

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Server is healthy',
    timestamp: new Date()
  })
})

app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: "Message from backend, everything is ok!",
    env: process.env.NODE_ENV || 'development',
    availableRoutes: [
      'GET /api - This endpoint',
      'GET /api/test - API test route',
      'GET /api/bmi - BMI API info',
      'POST /api/bmi - Create BMI record',
      'GET /api/bmi/:user_id - Get user BMI records',
      'GET /api/bmi/:user_id/latest - Get latest BMI record'
    ],
    timestamp: new Date()
  })
})

app.use('/bmi', bmiRoutes)  // This handles calls to /bmi directly


// BMI Routes
app.use('/api/bmi', bmiRoutes)


// Other API routes
app.use(API_PREFIX, routes)

// 404 Not Found Errors
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Endpoint not Found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /test-direct',
      'GET /api/test',
      'GET /health',
      'GET /api/bmi',
      'POST /api/bmi',
      'GET /api/bmi/:user_id',
      'GET /api/bmi/:user_id/latest'
    ]
  })
})

interface ExpressError extends Error {
  status?: number
  errors?: any
  additionalInfo?: any
}

// 500 Internal Errors
app.use((err: ExpressError, _req: Request, res: Response, _next: NextFunction) => {
  const isUnexpectedError = err.status === undefined
  console.log(err.message)
  console.log(err.stack)
  res.status(err.status || HTTP_CODE.INTERNAL_ERROR)
  res.json({
    // For unexpected errors in production, hide the message since it could contain relevant info
    message: (isUnexpectedError && PRODUCTION) ? 'Internal error' : err.message,
    errors: err.errors,
    ...(err.additionalInfo || {}),
  })
})

export default app

// Server startup
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`API available at: http://localhost:${PORT}/api`)
  console.log(`BMI endpoints at: http://localhost:${PORT}/api/bmi`)
  console.log(`Health check at: http://localhost:${PORT}/health`)
})