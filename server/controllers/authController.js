import db from "../utils/db.js"
import dotenv from "dotenv"
import { encryptPassword, comparePassword } from "../utils/passwords.js"
import jwt from "jsonwebtoken"
import {prisma} from "../utils/prisma.js"

/*
====================================================
    PATIENTS AUTHORIZARION
====================================================
*/

dotenv.config()

// patients registration route
export const patientsRegister = async (req, res) => {
    try {
        const data = req.body
        const patient = await prisma.patients.findUnique({
            where: {
                emailAdress: data.emailAddress
            }
        })

        // if patient already exists
        if(patient) {
            return res.status(400).json({ "message": "Patient already exists" })
        }

        // if patient does not exist
        const hashedPassword = encryptPassword(data.password)

        // accessing the profile picture
        const profilePicture = req.file ? req.file.path : null
        const newPatient = await prisma.patients.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                emailAdress: data.emailAddress,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                createdAt: new Date(),
                profilePicture: profilePicture,
                password: hashedPassword
            }
        })

        //if patient is successfully created
        res.status(201).json({ "message": "Patient created successfully" })
    }
    catch (err) {
        res.status(500).json({ "message": `Internal Server Error, ${err}` })
    }
}


// login route for the patients
export const patientsLogin = async (req, res) => {
    try{
        const data = req.body
        const patient = await prisma.patients.findUnique({
            where: {
                emailAdress: data.emailAddress
            }
        })

        // if patient does not exist
        if(!patient) {
            return res.status(400).json({ "message": "Patient does not exist" })
        }

        // if patient exists
        const isPasswordValid = comparePassword(data.password, patient.password)
        if(!isPasswordValid) {
            return res.status(400).json({ "message": "Invalid Password" })
        }

        // if password is valid
        // generate the access token
        const accessToken = jwt.sign({ id: patient.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

        // generate the refresh token
        const refreshToken = jwt.sign({ id: patient.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

        // store the refresh token in the database
        await prisma.refreshTokens.create({
            data: {
                token: refreshToken
            }
        })

        // send the access token and the refresh token as cookies
        res.cookie('access-token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })

        res.cookie('refresh-token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict'
        })

        res.status(200).json({ "message": "Login Successful" })
    }
    catch(err) {
        res.status(500).json({ "message": "Internal Server Error" })
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