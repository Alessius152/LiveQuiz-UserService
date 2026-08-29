
import Fastify, { FastifyInstance } from 'fastify'

import sequelize from './database/config.js'
import User from './database/models/User.js'

import './firebase/config.js'

import { authRouter } from './routing/authentication.js'
import { usersRouter } from './routing/users.js'

const server: FastifyInstance = Fastify({
    ajv: {
        customOptions: {
            removeAdditional: false,
            useDefaults: true
        }
    }
})

const startDB = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ force: false })

        await User.sync({ force: false })

        console.log("database connection established")
    }
    catch (err) {
        throw err
    }
}

const start = async () => {
    try {
        await startDB()
        await server.listen({ port: Number(process.env.SERVER_PORT) })

        console.log("server started")
    }
    catch (err) {
        console.log("start()", err)
        process.exit(1)
    }
}

server.register(authRouter, { prefix: '/auth' })
server.register(usersRouter, { prefix: '/users' })
start()
