import db from "../utils/db.js"
import bcrypt from "bcryptjs"


// get all patents
export const getPatients = async (req, res) => {
    try {
        const patients = "SELECT * FROM patients"
        db.query(patients, (err, data) => {
            // if the is an error
            if (err) return res.status(400).json({ "message": "Something went wrong" })

            // if no error is found and no patients are found
            if (!data.length) return res.status(404).json({ "mesasge": "You have no patients" })

            // if patients are found and the results are successfull
            res.status(200).json(data)
        })

    } catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}


// get patients by id
export const getPatientsById = async (req, res) => {
    try {
        const id = req.params.id

        // check if id is valid
        if (!id || id < 1 || isNaN(id)) {
            return res.status(400).json({ "message": "Invalid id number" })
        }

        const patientQuery = "SELECT * FROM patients WHERE patient_id = ?"
        db.query(patientQuery, id, (err, data) => {
            if (err) return res.status(400).json({ "message": "Something went wrong. Please try again" })

            if (!data.length) return res.status(404).json({ "message": "Patient Not Found!" })

            return res.status(200).json(data)
        })
    }
    catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}


// Get patient by name  
export const getPatientsByName = async (req, res) => {
    try {
        const { name } = req.query

        // chack if name field is valid
        if (!name || typeof name !== "string") {
            return res.status(400).json({ "message": "Invalid name format or missing value" })
        }

        // check number of names in the the input
        const patientName = name.split(" ")
        let getpatientQuery;
        let values;

        if (patientName.length > 1) {
            getpatientQuery = "SELECT * FROM patients WHERE first_name = ? AND last_name = ?"
            values = [patientName[0], patientName[1]]
        } else {
            getpatientQuery = "SELECT * FROM patients WHERE first_name = ? OR last_name = ?"
            values = [patientName[0], patientName[1]]
        }

        db.query(getpatientQuery, values, (err, data) => {
            if (err) {
                return res.status(400).json({ "message": "Something Went Wrong!" })
            }

            if (!data.length) {
                return res.status(404).json({ "message": "Patient Not Found!" })
            }

            res.status(200).json(data)
        })
    }
    catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
};


// get patients by gender
export const getPatientsByGender = async (req, res) => {
    try {
        const { gender } = req.params

        // validate the gender input
        if (!gender || typeof gender != "string" || gender !== "Male" && gender !== "Female") {
            return res.status(400).json({ "message": "Invalid or missing gender parameters" })
        }

        let genderQuery = "SELECT * FROM patients WHERE gender = ?";
        let value;

        gender === "Male" ? value = "Male" : value = "Female"

        db.query(genderQuery, [gender], (err, data) => {
            if (err) {
                return res.status(400).json({ "message": "Something Went Wrong" })
            }

            if (!data.length) {
                return res.status(404).json({ "message": "No Patient Found" })
            }

            return res.status(200).json(data)
        })
    }
    catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}


// patients registration route
export const registerPatients = async (req, res) => {
    try {
        // get the patient details
        const {
            first_name,
            last_name,
            date_of_birth,
            gender,
            language,
            phone_number,
            email_address,
            password
        } = req.body

        //
        const patientQuery = "SELECT * FROM patients WHERE email = ?"
        db.query(existingUser, email_address, (err, data) => {
            if (err) {
                return res.status(400).json({ "message": "Something Went Wrong. Please try again!" })
            }

            if (data.length) {
                return res.status(409).json({ "message": "Patient with this email already exisits" })
            }

            // password encryption
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            // add patient to the database
            const addPatient = `
                INSERT INTO patients(
                    first_name, 
                    last_name, 
                    date_of_birth, 
                    gender, 
                    language, 
                    phone_number,
                    email_address,
                    password
                ) VALUES (?)`


            const values = [first_name, last_name, date_of_birth, gender, language, phone_number,email_address, hashedPassword]
            db.query(addPatient, [values], (err, data) => {
                if(err) {
                    return res.status(400).json({ "message": "Could not add user. Please try again!" })
                }

                res.status(201).json({ "message": "User successfully added" })
            })
        })
    }
    catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}