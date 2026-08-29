
import { preHandlerAsyncHookHandler } from "fastify"
import { HttpStatusCode } from "../utils/enums/http-status-code.js"
import { auth } from "../firebase/config.js"

const checkAuthorization: preHandlerAsyncHookHandler = async (request, reply) => {
    const { authorization } = request.headers

    if (!authorization) {
        reply.status(HttpStatusCode.UNAUTHORIZED).send({})
        return
    }

    const parts = authorization.split(' ')
    const prefix = parts[0]
    const token = parts[1]
    const other = parts[2]

    if (
        (prefix !== 'Bearer') ||
        (!token) ||
        (!token.trim()) ||
        (other !== undefined)
    ) {
        reply.status(HttpStatusCode.UNAUTHORIZED).send({})
        return
    }

    try {
        const decoded = await auth.verifyIdToken(token)
        request.fbProfile = decoded
    }
    catch (err: any) {
        console.log("error decodifica", err)
        const unauth = (
            err.code === 'auth/id-token-expired' ||
            err.code === 'auth/argument-error' ||
            err.code === 'auth/id-token-revoked'
        )
        const status = unauth ?
            HttpStatusCode.UNAUTHORIZED :
            HttpStatusCode.INTERNAL_SERVER_ERROR

        reply.status(status).send({})
        return
    }

}

export {
    checkAuthorization,
}
