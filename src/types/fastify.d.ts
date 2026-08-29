import 'fastify'
import { DecodedIdToken } from 'firebase-admin/auth'

interface User {
    pk: number,
    username: string,
    createdAt: Date,
}

declare module 'fastify' {
    interface FastifyRequest {
        fbProfile?: DecodedIdToken,
        user?: User 
    }
}

export {
    User,
}
