
import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import serviceAccount from '../../firebase-private-credentials.json' with { type: 'json' }

const app = admin.initializeApp({
    credential: admin.cert(serviceAccount as admin.ServiceAccount)
})

const auth = getAuth(app)

export {
    auth
}
