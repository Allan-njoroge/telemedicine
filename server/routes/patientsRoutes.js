import express from "express"
import { getPatients, getPatientsById, getPatientsByName, getPatientsByGender, patientsRegister, patientsLogin } from "../controllers/patientsController.js"

const router = express.Router()

// get all patents
router.get('', getPatients)

//get patient by id
router.get('/id/:id', getPatientsById)

// get patient by name
router.get('/name', getPatientsByName)

// get all patients by gender
router.get('/gender/:gender', getPatientsByGender)


// patient registration route
router.post('/register', patientsRegister)

// patient login route
router.post('/login', patientsLogin)


export default router