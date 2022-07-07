const db = require('../db')
const {UnauthorizedError, BadRequestError} = require('../utils/errors');

class User {
    static async login(credentials) {
        /* user should submit email and password,
           if any of these fields are missing then throw an error.

           lookup the user in the db by email,
           if a user is found, compare the submitted password
           with the password in the database
           if there is a match, return the user
        
           if any of this goes wrong, throw and error*/
        throw new UnauthorizedError('Invalid email/password combo')
    }

    static async register(credentials) {
        /* user should submit their email, pw, first name, last name, location, and date
           if any of these fields are missing, throw an error */
        const requiredFields = ['password', 'firstName', 'lastName', 'email', 'location']
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`);
            }
        })

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }
           
        /* make sure no user already exists in the system with that email
           if one does, throw an error */
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        /*take the user's password, and hash it
           take the user's email, and lowercase it */
        const lowercasedEmail = credentials.email.toLowerCase();

        /* create a new user in the database with all their info
           return the user
            */
        const result = await db.query(`
        INSERT INTO users (
            password,
            first_name,
            last_name,
            email,
            location
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, password, first_name, last_name, email, location, date;
        `, [credentials.password, credentials.firstName, credentials.lastName, lowercasedEmail, credentials.location])

        const user = result.rows[0]

        return user;
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError('No email provided.')
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user
    }
}

module.exports = User;