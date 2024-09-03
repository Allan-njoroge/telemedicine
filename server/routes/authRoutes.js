import express from "express"
import { patientsRegister, patientsLogin } from "../controllers/authControllers"
const router = express.Router()



// ====== Patients authorization routes
// patient registration route
router.post('/register', patientsRegister)

// patient login route
router.post('/login', patientsLogin)


// ==== Doctors authorization route


export default router;