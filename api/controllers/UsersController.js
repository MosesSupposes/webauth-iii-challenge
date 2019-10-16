const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const usersModel = require('../models/usersModel')
const withCatch = require('../../utils/withCatch')

module.exports = class UsersController {
    static async index(req, res) {
        const [err, users] = await withCatch( usersModel.all() )

        if (err || Object.keys(users).length === 0) {
            res.status(404).json({ error: { message: 'No users exist in the database yet.'  } })
        }  else {
            res.status(200).json(users)
        }
    }

    static async register(req, res) {
        const { username, password } = req.body 
        
        bcrypt.hash(password, 8, (err, encryptedPw) => {
            if (err) res.status(500).json({ error: { message:'Internal server error.'  } })
            else {
                const [err, newUser]  = await withCatch(
                    usersModel.create({
                        username,
                        password: encryptedPw
                    }) 
                )
                if (err) res.status(500).json({ error: { message:'Internal server error.'  } })
                else res.status(200).json(newUser)        
            }
        })
    }

    static async login(req, res) {
        const [err, user] = await withCatch ( usersModel.findByUsername(req.body.username) )

        if (err) res.status(404).json({ error: { message: 'Invalid username' } })
        else {
            bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
                if (err) res.status(500).json({ error: { message: 'Internal server error'}})
                else if (!passwordsMatch) res.status(400).json({ error: { message: 'Invalid password'} })
                else res.status(200).json({
                    success: 'Welcome ' + user.username + '!',
                    user,
                    token: generateToken()
                })
            })
        }

        function generateToken() {
            const secret = process.env.JWT_SECRET || 'this is not secret.'
            const payload = {
                username: user.username,
                subject: user.id,
            }
            const options = { expiresIn: '1h' }

            return jwt.sign(payload, secret, options)
        }
    }

    static async update() {

    }

    static async remove() {

    }
}