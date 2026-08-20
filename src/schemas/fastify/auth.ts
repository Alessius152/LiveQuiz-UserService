
import { FastifySchema } from "fastify"

const completeAuthSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['username'],
        properties: {
            username: {
                type: 'string',
                minLength: 4,
                maxLength: 64,
            },
        },
        additionalProperties: false
    }
}

export {
    completeAuthSchema,
}
