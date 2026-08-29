
import { FastifySchema } from "fastify"

/*Mi aspetto un'array di massimo 48 identificativi, ognuno dei quali è un firebase_uid

Per coprire tutti i possibili firebase_uid ho scelto di mettere una lunghezza variabile tra 1 e 128 caratteri
perché, anche se la lunghezza degli uid è sempre uguale, non è formalmente espresso quale sia il numero esatto.
*/
const metadataFetchingSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['identifiers'],
        properties: {
            identifiers: {
                type: 'array',
                minItems: 1, 
                maxItems: 48, 
                items: {
                    type: 'string',
                    minLength: 1, 
                    maxLength: 128,
                }
            }
        },
        additionalProperties: false
    }
}

export {
    metadataFetchingSchema,
}
