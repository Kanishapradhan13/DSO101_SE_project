// File: backend/src/controllers/bmiController.ts

import { Request, Response } from 'express'
import knex from 'knex'
import { databaseConfig } from '../config'

// Create the database connection
const db = knex(databaseConfig)

interface BMIRequestBody {
  user_id: string
  height: number
  weight: number
  age: number
}

interface BMICalculationResult {
  bmi: number
  category: string
}

// Calculate BMI and determine category
const calculateBMI = (weight: number, height: number): BMICalculationResult => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  let category: string
  if (bmi < 18.5) {
    category = 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal weight'
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight'
  } else {
    category = 'Obese'
  }
  return { bmi: Math.round(bmi * 100) / 100, category }
}

// Create BMI record
const createBMI = async (req: Request, res: Response) => {
  try {
    const { user_id, height, weight, age } = req.body as BMIRequestBody
    // Validate input
    if (!user_id || !height || !weight || !age) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    if (height <= 0 || weight <= 0 || age <= 0) {
      return res.status(400).json({ error: 'Values must be positive numbers' })
    }
    const { bmi, category } = calculateBMI(weight, height)
    const [newRecord] = await db('bmi_records')
      .insert({
        user_id,
        height,
        weight,
        age,
        bmi,
        category
      })
      .returning('*')
    res.status(201).json(newRecord)
  } catch (error) {
    console.error('Error creating BMI record:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get BMI records for a user
const getBMIRecords = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params
    const records = await db('bmi_records')
      .where('user_id', user_id)
      .orderBy('created_at', 'desc')
    res.json(records)
  } catch (error) {
    console.error('Error fetching BMI records:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get latest BMI record for a user
const getLatestBMI = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params
    const record = await db('bmi_records')
      .where('user_id', user_id)
      .orderBy('created_at', 'desc')
      .first()
    if (!record) {
      return res.status(404).json({ error: 'No BMI records found' })
    }
    res.json(record)
  } catch (error) {
    console.error('Error fetching latest BMI:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export {
  createBMI,
  getBMIRecords,
  getLatestBMI,
  calculateBMI
}