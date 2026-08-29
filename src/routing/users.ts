import { FastifyPluginAsync } from "fastify"
import { checkAuthorization } from "../preHandlers/checkAuthorization.js"
import { checkUserExistance } from "../preHandlers/checkUserExistance.js"
import { metadataController } from "../controllers/users/metadata.js"
import { metadataFetchingSchema } from "../schemas/fastify/users.js"

const usersRouter: FastifyPluginAsync = async (fastify) => {

    /*
    /metadata è un endpoint che, ricevuto un'array di identificativi firebase_uid di utenti,
    restituisce i loro metadati (username etc.)
    */
    fastify.post('/metadata',
        {
            schema: metadataFetchingSchema,
            preHandler: [checkAuthorization, checkUserExistance]
        },
        metadataController
    )
}

export {
    usersRouter
}
