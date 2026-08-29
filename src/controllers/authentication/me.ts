import { RouteHandlerMethod } from "fastify"

const meController: RouteHandlerMethod = async (request, reply) => {
    const { username, createdAt } = request.user!
    return { username, createdAt }
}

export {
    meController
}
