import 'fastify'
import { DecodedIdToken } from 'firebase-admin/auth'

interface User {
    pk: number,
    firebaseUid: string,
    username: string    
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
