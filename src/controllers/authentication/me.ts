import { RouteHandlerMethod } from "fastify"

const meController: RouteHandlerMethod = async (request, reply) => {
    const { username } = request.user!
    return { username }
}

export {
    meController
}
