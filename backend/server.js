import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import routes from './routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 7004

// Function to start the server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB()
    // Middleware
    app.use(cors())
    app.use(express.json())
    app.use(rateLimit({ windowMs: 30 * 1000, max: 10 }))

    app.use('/', routes)
    // Start the server after DB connection
    app.listen(PORT, () =>
      console.log(`Server started running on port ${PORT}`)
    )
  } catch (error) {
    console.error('Failed to start the server:', error)
    process.exit(1)
  }
}

// Call the function to start the server
startServer()
