
import { FastifyPluginAsync } from "fastify"
import { checkAuthorization } from "../preHandlers/checkAuthorization.js"
import { completeAuthSchema } from "../schemas/fastify/auth.js"
import { meController } from "../controllers/authentication/me.js"
import { completeController } from "../controllers/authentication/complete.js"
import { checkUserExistance } from "../preHandlers/checkUserExistance.js"

const authRouter: FastifyPluginAsync = async (fastify) => {
    fastify.get('/me',
        {
            preHandler: [checkAuthorization, checkUserExistance]
        },
        meController
    )

    fastify.post('/complete',
        {
            schema: completeAuthSchema,
            preHandler: [checkAuthorization]
        },
        completeController
    )
}

export {
    authRouter
}
