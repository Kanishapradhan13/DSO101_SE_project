import express, { Request, Response } from 'express'
import { createBMI, getBMIRecords, getLatestBMI } from '../controllers/bmiController'

const router = express.Router()

// GET /api/bmi - Test route (ADD THIS)
router.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'BMI API is working!',
    availableRoutes: [
      'POST /api/bmi - Create BMI record',
      'GET /api/bmi/:user_id - Get user BMI records',
      'GET /api/bmi/:user_id/latest - Get latest BMI record'
    ],
    timestamp: new Date()
  })
})

// POST /api/bmi - Create new BMI record
router.post('/', (req: Request, res: Response) => {
  createBMI(req, res)
})

// GET /api/bmi/:user_id - Get all BMI records for a user
router.get('/:user_id', (req: Request, res: Response) => {
  getBMIRecords(req, res)
})

// GET /api/bmi/:user_id/latest - Get latest BMI record for a user
router.get('/:user_id/latest', (req: Request, res: Response) => {
  getLatestBMI(req, res)
})

export default router