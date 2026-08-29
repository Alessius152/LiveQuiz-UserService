
import { preHandlerAsyncHookHandler } from "fastify"
import { HttpStatusCode } from "../utils/enums/http-status-code.js"
import { getAccountByFirebaseUid } from "../repositories/auth.js"

const checkUserExistance: preHandlerAsyncHookHandler = async (request, reply) => {

    const { uid } = request.fbProfile!

    try {

        const user = await getAccountByFirebaseUid(uid)

        if (!user) {
            reply.status(HttpStatusCode.NOT_FOUND).send({ needAuth: true })
            return
        }

        request.user = {
            pk: user.id,
            username: user.username,
            createdAt: user.createdAt
        }

        return

    }
    catch (err) {
        reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({})
        return
    }
}

export {
    checkUserExistance,
}
