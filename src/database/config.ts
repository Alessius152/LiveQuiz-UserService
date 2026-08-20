
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASW,
    database: process.env.DB_NAME,
    logging: false,
})

export default sequelize
