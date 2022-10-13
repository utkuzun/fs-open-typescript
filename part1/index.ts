import express from 'express'
import { calCulateBmi } from './calculateBmi'
import { calculateExercises } from './exerciseCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (!weight || !height) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  try {
    const bmi: string = calCulateBmi(Number(weight), Number(height))
    return res.json({ bmi, height, weight })
  } catch (error) {
    return res.json({ error: 'Internal server error!!' })
  }
})

app.post('/exercises', (req, res) => {
  const { daily_exercises: exercises, target } = req.body

  if (!exercises || !target) {
    return res.status(400).json({ error: 'malformatted parameters' })
  }

  try {
    const result = calculateExercises(exercises, target)

    return res.json({ result })
  } catch (error) {
    return res.json({ error: 'Internal server error!!' })
  }
})

const PORT = 3000

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}...`)
    })
  } catch (error: unknown) {
    console.log(error)
  }
}

start()
