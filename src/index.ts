import authRouter from './routes/auth'
import themeRouter from './routes/theme'
import taskRouter from './routes/tasks'
import categoryRouter from './routes/category'
import authMiddleware from './middlewares/authMiddleware'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: ['http://localhost:3000'],
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  optionSuccessStatus: 200,
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors(corsOptions))

app.use(authMiddleware)

mongoose.connect(process.env.MONGODB_URI as string, () => {
  console.log('Connected to MongoDB')
})

app.use('/auth', authRouter)
app.use('/theme', themeRouter)
app.use('/tasks', taskRouter)
app.use('/categories', categoryRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
