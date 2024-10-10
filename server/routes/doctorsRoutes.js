import express from "express"
import { getDoctors, getDoctorsById, getDoctorsByName, getDoctorsByGender } from "../controllers/doctorsController.js"

const router = express.Router()

// get all doctors
router.get('', getDoctors)

//get doctor by id
router.get('/id/:id', getDoctorsById)

// get doctor by name
router.get('/name', getDoctorsByName)

// get all doctors by gender
router.get('/gender/:gender', getDoctorsByGender)

// update doctor
router.put('/update/:id')



export default router