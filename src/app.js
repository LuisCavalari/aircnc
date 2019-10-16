const express = require('express')
const cors = require('cors')
const path = require('path')
const socket = require('socket.io')

const connectedUsers = {}




class AppController {
    constructor() {
        this.express = express()
        this.middlewares()
        this.server = require('http').Server(this.express)
        this.io = socket(this.server)
        this.IoMiddlewares()
        this.routes();
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(cors())
        this.express.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
        
        
    }
    IoMiddlewares(){
        this.express.use((request, response, next) => {
            request.io = this.io
            request.connectedUsers = connectedUsers
            return next()
        })
        this.io.on('connection', socket => {
            connectedUsers[socket.handshake.query.userId] = socket.id
        })
    }

    routes() {
        this.express.use(require('./routes'))
    }

}

module.exports = new AppController().server

