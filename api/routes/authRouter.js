const express = require('express')

const UsersController = require('../controllers/UsersController')
const validateFields = require('../knexfile')

const router = express.router

router.route('/register')
    .all(validateFields(['username', 'password']))
    .post(UsersController.register)

router.route('/login')
    .all(validateFields(['username', 'password']))
    .post(UsersController.login)