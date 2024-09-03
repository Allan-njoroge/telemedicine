import bcrypt from "bcryptjs"

/**
 * Utilities for password encryption and comparison using bcryptjs.
 * 
 * 1. `encryptPassword(password)`: Hashes the provided password with a salt.
 * 2. `comparePassword(password, retrievedPassword)`: Compares a plain password
 *    with a hashed password to verify if they match.
 */


export const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
// const hashedPassword = encryptPassword("Allan")

export const comparePassword = (password, retrievedPassword) => {
    return bcrypt.compareSync(password, retrievedPassword); 
}
// const comparison = comparePassword("Allan1", hashedPassword)