import express from "express"
import { getDoctors, getDoctorsById, getDoctorsByName, getDoctorsByGender } from "../controllers/doctorsController.js"

const router = express.Router()

// get all patents
router.get('', getDoctors)

//get patient by id
router.get('/id/:id', getDoctorsById)

// get patient by name
router.get('/name', getDoctorsByName)

// get all patients by gender
router.get('/gender/:gender', getDoctorsByGender)



export default router