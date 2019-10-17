const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

const PORT = process.env.PORT || 4000

server.use(express.json())
server.use(helmet())
server.use(cors())

server.use(function notFound(req, res, next) {
    const error = new Error('Not found.')
    error.status = 404

    next(error)
})

server.use(function errorHandler(error, req, res, next) {
    error.status = error.status || 500
    error.message = error.message || 'Internal server error'

    res.status(status).json({error: { errorMsg } })
})


server.listen(PORT, () => { console.log('server listenting on port ' + PORT) })