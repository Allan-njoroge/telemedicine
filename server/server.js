import express from "express";
import dotenv from "dotenv";
import db from "./utils/db.js";
import cookieParser from 'cookie-parser'



// import routes
// import { authRoutes, patientsRoutes } from "./routes/index.js"
import authRoutes from "./routes/authRoutes.js"
import patientsRoutes from './routes/patientsRoutes.js'
import doctorsRoutes from './routes/doctorsRoutes.js'


// Middlewares configuration
const app = express()
app.use(express.json())
app.use(cookieParser())
dotenv.config()


// test the connection of the database
db.connect((err) => {
    if (err) return console.log(`Error connection to MySQL: ${err}`)

    console.log(`Database connection successful`)
})
 

// 

// serve the routes
app.use("/api/auth", authRoutes)
app.use("/api/patients", patientsRoutes)
app.use("/api/doctors", doctorsRoutes)



// listen to the server
const PORT = process.env.PORT | 8000
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})