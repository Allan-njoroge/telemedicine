import express from "express"
import { patientsRegister, patientsLogin, doctorsRegister, doctorsLogin, logout } from "../controllers/authController.js"


const router = express.Router()


// Patients authorization routes
router.post('/patients/register', patientsRegister)
router.post('/patients/login', patientsLogin)

// Doctors authorization route
router.post('/doctors/register', doctorsRegister)
router.post('/doctors/login', doctorsLogin)

// Universal Logout Route
router.post('/logout', logout)


export default router;