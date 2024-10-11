import db from "../utils/db.js"
import dotenv from "dotenv"
import { encryptPassword, comparePassword } from "../utils/passwords.js"
import jwt from "jsonwebtoken"

/*
====================================================
    PATIENTS AUTHORIZARION
====================================================
*/

dotenv.config()

// patients registration route
export const patientsRegister = async (req, res) => {
    try {
        // get the patient details
        const {
            first_name, last_name, date_of_birth, gender, language, phone_number, email_address, password 
        } = req.body

        //
        const existingUser = "SELECT * FROM patients WHERE email_address = ?"
        db.query(existingUser, [email_address], (err, data) => {
            if (err) {
                return res.status(400).json({ "message": `Something Went Wrong. Please try again! ${err}` })
            }

            if (data.length) {
                return res.status(409).json({ "message": "Patient with this email already exisits" })
            }

            // password encryption
            const hashedPassword = encryptPassword(password);

            // add patient to the database
            const addPatient = `
                INSERT INTO patients(
                    first_name, last_name, date_of_birth, gender, language, phone_number, email_address, password
                ) VALUES (?)`


            const values = [first_name, last_name, date_of_birth, gender, language, phone_number,email_address, hashedPassword]
            db.query(addPatient, [values], (err) => {
                if(err) {
                    return res.status(400).json({ "message": "Could not add user. Please try again!" })
                }

                res.status(201).json({ "message": "Patient Successfully Registered" })
            })
        })
    }
    catch (err) {
        res.status(500).json({ "message": `Internal Server Error, ${err}` })
    }
}


// login route for the patients
export const patientsLogin = async (req, res) => {
    try{
        const { email_address, password } =  req.body

        const exisitinguser = "SELECT * FROM patients WHERE email_address = ?"
        db.query(exisitinguser, [email_address], (err, data) => {
            if(err) {
                return res.status(400).json({ "message": "Failed to login. Please try again" })
            }

            if(!data.length) {
                return res.status(404).json({ "message": "Patient Not Found!" })
            }

            const passwordMatch = comparePassword(password, data[0].password)

            if(!passwordMatch) {
                return res.status(400).json({ "message": "Invalid email or password" })
            }

            const userDetails = { 
                id:data[0].patient_id, 
                first_name:data[0].first_name, 
                last_name:data[0].last_name, 
                email:data[0].email_address 
            }

            const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
            const refreshToken = jwt.sign(userDetails, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' })

            res.cookie('access-token', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 10 * 60 * 1000
            })

            res.cookie('refresh-token', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
            });

            res.status(200).json({
                message: "Patient logged in successfully",
                accessToken,
                refreshToken
            })
        })
    }
    catch(err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}


/*
====================================================
    DOCTORS AUTHORIZARION
====================================================
*/
// doctors registration
export const doctorsRegister = async (req, res) => {
    try {
        // get the patient details
        const {
            first_name, last_name, provider_specialty, email_address, phone_number, date_joined, password
        } = req.body

        //
        const existingUser = "SELECT * FROM patients WHERE email_address = ?"
        db.query(existingUser, [email_address], (err, data) => {
            if (err) {
                return res.status(400).json({ "message": `Something Went Wrong. Please try again! ${err}` })
            }

            if (data.length) {
                return res.status(409).json({ "message": "Doctor with this email already exisits" })
            }

            // password encryption
            const hashedPassword = encryptPassword(password);

            // add patient to the database
            const addPatient = `
                INSERT INTO patients(
                    first_name, last_name, provider_specialty, email_address, phone_number, date_joined, password
                ) VALUES (?)`


            const values = [first_name, last_name, provider_specialty, email_address, phone_number, date_joined, hashedPassword]
            db.query(addPatient, [values], (err) => {
                if(err) {
                    return res.status(400).json({ "message": "Could not add user. Please try again!" })
                }

                res.status(201).json({ "message": "Doctor Successfully Registered" })
            })
        })
    }
    catch (err) {
        res.status(500).json({ "message": `Internal Server Error, ${err}` })
    }
}


// doctors login route
export const doctorsLogin = async(req, res) => {
    try{
        const { email_address, password } = req.body

        if(!email_address || !password) {
            return res.status(400).json({ "message": "Please fill in all the required fields" })
        }

        const existingDoctor = "SELECT * FROM provider WHERE email_address = ?"
        db.query(existingDoctor, email_address, (err, data) => {
            if(err) {
                return res.status(400).json({ "message": "Unable to retrieve doctor inforamtion" })
            }

            if(!data.length) {
                return res.status(404).json({ "message": "Doctor Not Found!" })
            }

            // Validate password
            const passwordMatch = comparePassword(password, data[0].password)

            if(!passwordMatch) {
                return res.status(400)
            }

            const userDetails = { id:data[0].provider_id, first_name:data[0].first_name, last_name:data[0].last_name, email:data[0].email_address  }

            const accessToken = jwt.sign(userDetails, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
            const refreshToken = jwt.sign(userDetails, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30s' })

            res.cookie('access-token', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 10 * 60 * 1000
            })

            res.cookie('refresh-token', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
            });

            res.status(200).json({
                message: "Doctor logged in successfully",
                accessToken,
                refreshToken
            }) 
        }) 
    }
    catch(err) {
        return res.status(500).json({ "message": "Internal Server Error" })
    }
}

/*
====================================================
    LOGOUT
====================================================
*/
export const logout = async(req, res) => {
    try{
        // clear the access token and the refresh token
        res.clearCookie('access-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })

        res.clearCookie('refresh-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })

        res.status(200).json({ message: "Logout Successful" })
    }
    catch(err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}