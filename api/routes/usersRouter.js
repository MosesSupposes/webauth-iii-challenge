const express = require('express')

const UsersController = require('../controllers/UsersController')
const requireValidToken = require('../middleware/requireValidToken')
const validateFields = require('../')

const router = express.router

router.route('/')
    .all(requireValidToken)
    .get(UsersController.index)

router.route('/register')
    .all(validateFields(['username', 'password']))
    .post(UsersController.register)

router.route('/login')
    .all(validateFields(['username', 'password']))
    .post(UsersController.login)