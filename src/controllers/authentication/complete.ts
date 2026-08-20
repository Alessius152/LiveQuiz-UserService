import { RouteHandlerMethod } from "fastify"
import { createUser, getAccountByFirebaseUid } from "../../repositories/auth.js"
import { HttpStatusCode } from "../../utils/enums/http-status-code.js"
import { completeAuthSchema_Type } from "../../schemas/node/auth.js"

const completeController: RouteHandlerMethod = async (request, reply) => {
    const { firebaseUid } = request.user!
    const { username } = request.body as completeAuthSchema_Type['body']

    try {

        const user = await getAccountByFirebaseUid(firebaseUid)

        if (user) {
            reply.status(HttpStatusCode.CONFLICT).send({
                username: user.username,
                createdAt: user.createdAt
            })
            return
        }

        const { createdAt } = await createUser({ firebaseUid, username })
        reply.status(HttpStatusCode.OK).send({ username, createdAt })
        return

    }
    catch (err) {
        reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({})
        return
    }
}

export {
    completeController
}
