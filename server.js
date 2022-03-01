const http = require('http')
const app = require('./app')

const PORT = require('./api/config/.env').PORT || 5000

const server = http.createServer(app)

server.listen(PORT)