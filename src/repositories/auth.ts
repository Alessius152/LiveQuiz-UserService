
import User from "../database/models/User.js"
import { UserInsert } from "../models/db/auth.js"

const getAccountByFirebaseUid = async (uid: string) => {
    return await User.findOne({
        where: { firebaseUid: uid }
    })
}

const createUser = async ({ firebaseUid, username }: UserInsert) => {
    return await User.create({ firebaseUid, username })
}

export {
    getAccountByFirebaseUid,
    createUser,
}
