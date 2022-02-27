const http = require('http')
const app = require('./app')

const PORT = require('./config/.env').PORT || 5000

const server = http.createServer(app)

server.listen(PORT)