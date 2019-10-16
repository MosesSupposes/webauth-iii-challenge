const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

const PORT = process.env.PORT || 4000

server.use(express.json())
server.use(helmet())
server.use(cors())


server.listen(PORT, () => { console.log('server listenting on port ' + PORT) })