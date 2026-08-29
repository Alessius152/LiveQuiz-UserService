import { QueryTypes } from "sequelize"
import sequelize from "../database/config.js"

/*
identifiers qui è un array di stringhe, ogni stringa è un firebase uid.
*/
const getUsersMetadataBatch = async (identifiers: Array<string>) => {

    const sql = "select firebaseUid as uid, username from accounts where firebaseUid in (:identifiers)"

    const metadata = await sequelize.query<{ uid: string, username: string }>(sql, {
        replacements: { identifiers },
        type: QueryTypes.SELECT
    })

    return metadata

}

export {
    getUsersMetadataBatch,
}
