import dotenv from "dotenv";
import { encryptPassword, comparePassword } from "../utils/passwords.js";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma.js";
import mail from "../services/email/email.js";


/*
==========================
  PATIENTS AUTHORIZARION
==========================
*/

dotenv.config();

// register patients route
export const patientsRegister = async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, gender, dateOfBirth, password } = req.body;

    // check if all fields have some data
    if(!firstName || !lastName || !emailAddress || !gender || !dateOfBirth || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // find a user with the same email
    const patient = await prisma.patients.findUnique({
      where: { emailAddress: emailAddress }
    });

    // if patients already exists in the database
    if(patient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    // generate and authentication code
    const authCode = Math.floor(Math.random() * 1000000);
    await prisma.authCode.create({
      data: {
        authCode: authCode,
        createdAt: new Date(Date.now())
      }
    });

    // send the authentication code
    await mail({
      to: emailAddress,
      subject: "Authentication Code",
      html: `
        <p>
        Hello ${firstName},
        <br/>
        Your authentication code is ${authCode}
        <br/><br/>
        <b>Note: This code is valid for 10 minutes.</b>
        </p>
        `,
    });

    res
      .status(200)
      .json({ message: "Authentication code sent, please check your email" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error: ", err});
  }
};

// confirmation of the authCode
export const confirmAuthCode = async (req, res) => {
  try {
    const { authCode, firstName, lastName, emailAddress, password, gender, dateOfBirth } = req.body;

    //check if the auhentication code field is empty
    if(!authCode) {
      res.status(404).json({ message: "Field is empty" })
    }

    // check if all fields have some data
    if(!firstName || !lastName || !emailAddress || !gender || !dateOfBirth || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // retrieve the authCode from the database
    const storedCode = await prisma.authCode.findUnique({
      where: {
        authCode: authCode
      }
    });

    // if no authentication code
    if(storedCode.authCode !== authCode) {
      return res.status(404).json({ message: "This code is invalid" })
    }

    // check if code is expired
    const codeAge = Date.now() - new Date(storedCode.createdAt).getTime()
    const expTime = 10 * 60 * 1000;

    if(codeAge > expTime) {
      // delete the authentication code
      await prisma.authCode.delete({
        where: {
          authCode: authCode
        }
      })
      return res.status(400).json({ message: "This code is already expired" })
    }
     

    // if code is vald, proceed to add the user
    const hashedPassword = encryptPassword(req.body.password);
    const profilePicture = req.file
      ? `/uploads/profile_pictures/${req.file.filename}+${Date.now()}`
      : null;

    const newPatient = await prisma.patients.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        gender: gender,
        dateOfBirth: new Date(dateOfBirth).toISOString(),
        createdAt: new Date(),
        profilePicture: profilePicture,
        password: hashedPassword,
      },
    });

    // Delete the authentication code
    await prisma.authCode.delete({
      where: {
        authCode: authCode
      }
    })

    res.status(201).json({ message: "Patient created successfully" })
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

// login route for the patients
export const patientsLogin = async (req, res) => {
  try {
    const data = req.body;
    const patient = await prisma.patients.findUnique({
      where: {
        emailAddress: data.emailAddress,
      },
    });

    // if patient does not exist
    if (!patient) {
      return res.status(400).json({ message: "Patient does not exist" });
    }

    // if patient exists
    const isPasswordValid = comparePassword(data.password, patient.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // if password is valid
    // generate the access token
    const accessToken = jwt.sign(
      { id: patient.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // generate the refresh token
    const refreshToken = jwt.sign(
      { id: patient.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // store the refresh token in the database
    await prisma.refreshTokens.create({
      data: {
        token: refreshToken,
      },
    });

    // send the access token and the refresh token as cookies
    res.cookie("access-token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Login Successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/*
==========
  LOGOUT
==========
*/
export const logout = async (req, res) => {
  try {
    // clear the access token and the refresh token
    res.clearCookie("access-token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.clearCookie("refresh-token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logout Successful" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
