import db from "../utils/db.js"


// get all patents
export const getDoctors = async (req, res) => {
    try {
        const patients = "SELECT * FROM providers"
        db.query(patients, (err, data) => {
            // if the is an error
            if (err) return res.status(400).json({ "message": "Failed to fetch doctors" })

            // if no error is found and no patients are found
            if (!data.length) return res.status(404).json({ "mesasge": "You have no doctors" })

            // if patients are found and the results are successfull
            res.status(200).json(data)
        })

    } catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}


// get patients by id
export const getDoctorsById = async (req, res) => {
    try {
        const id = req.params.id

        // check if id is valid
        if (!id || id < 1 || isNaN(id)) {
            return res.status(400).json({ "message": "Invalid id number" })
        }

        const patientQuery = "SELECT * FROM patients WHERE provider_id = ?"
        db.query(patientQuery, id, (err, data) => {
            if (err) return res.status(400).json({ "message": "Something went wrong. Please try again" })

            if (!data.length) return res.status(404).json({ "message": "Doctor Not Found!" })

            return res.status(200).json(data)
        })
    }
    catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
}


// Get patient by name  
export const getDoctorsByName = async (req, res) => {
    try {
        const { name } = req.query

        // chack if name field is valid
        if (!name || typeof name !== "string") return res.status(400).json({ "message": "Invalid name format or missing value" })

        // check number of names in the the input
        const patientName = name.split(" ")
        let getpatientQuery;
        let values;

        if (patientName.length > 1) {
            getpatientQuery = "SELECT * FROM providers WHERE first_name = ? AND last_name = ?"
            values = [patientName[0], patientName[1]]
        } else {
            getpatientQuery = "SELECT * FROM providers WHERE first_name = ? OR last_name = ?"
            values = [patientName[0], patientName[1]]
        }

        db.query(getpatientQuery, values, (err, data) => {
            if (err) {
                return res.status(400).json({ "message": "Something Went Wrong!" })
            }

            if (!data.length) {
                return res.status(404).json({ "message": "Doctor Not Found!" })
            }

            res.status(200).json(data)
        })
    }
    catch (err) {
        res.status(500).json({ "message": "Internal Server Error" })
    }
};


// get patients by gender
export const getDoctorsByGender = async (req, res) => {
    try {
        const { gender } = req.params

        // validate the gender input
        if (!gender || typeof gender != "string" || gender !== "Male" && gender !== "Female") {
            return res.status(400).json({ "message": "Invalid or missing gender parameters" })
        }

        let genderQuery = "SELECT * FROM providers WHERE gender = ?";
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

// update doctor information
export const updateDoctor = async(req, res) => {
    try{
        const doctorId = req.params.id
        const { first_name, last_name } = req.body

        const [doctor] = await db.query('SELECT * FROM doctors WHERE provider_id = ?', [doctorId])
        if(!doctor.length) {
            return res.status(404).json({ message: "Doctor Not Found" })
        }

        // dynamic queries and values to updat
        const fields = []
        const values = []


        // first_name
        if(first_name) {
            fields.push('first_name = ?')
            values.push('first_name')
        }

        // last name
        if(last_name) {
            fields.push('last_name = ?')
            values.push('last_name')
        }
        
        // if there are no fiels to update
        if(!fields.length) {
            return res.status(400).json({ message: "No fields to update" })
        }

        // add doctor id to the vaues of the array for the where clause
        values.push(doctorId)
 
        const sql = `UPDATE doctors SET ${fields.join(', ')} WHERE provider_id = ?`
        await db.query(sql, values)

        return res.status(200).json({ message: "Doctor upadted succeddfully" })
    }
    catch(err) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}