
import { RouteHandlerMethod } from "fastify"
import { metadataFetchingSchema_Type } from "../../schemas/node/users.js"
import { HttpStatusCode } from "../../utils/enums/http-status-code.js"
import { getUsersMetadataBatch } from "../../repositories/users.js"

const metadataController: RouteHandlerMethod = async (request, reply) => {

    const fbAuth = request.fbProfile!
    const { identifiers } = request.body as metadataFetchingSchema_Type['body']

    try {

        const clearedIdentifiers = [...new Set(identifiers)].filter(id => id != fbAuth.uid)

        if (!clearedIdentifiers.length) {
            reply.status(HttpStatusCode.BAD_REQUEST).send({})
            return
        }

        const data = await getUsersMetadataBatch(clearedIdentifiers)

        return data.map(user => [user.uid, user.username])

    }
    catch (err) {
        reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({})
        return
    }

}

export {
    metadataController,
}
