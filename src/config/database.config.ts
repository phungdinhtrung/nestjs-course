import { DataSource } from "typeorm"

const dbConfig = new DataSource({
    type: 'postgres',                           // type of our database
    host: process.env.HOST,                     // database host
    port: parseInt(process.env.POSTGRES_PORT),  // database port
    username: process.env.POSTGRES_USER,        // username
    password: process.env.POSTGRES_PASSWORD,    // user password
    database: process.env.POSTGRES_DB,          // name of database
    // autoLoadEntities: true,                     // models will be loaded automatically 
    synchronize: true                           // your entities will be synced with the database(recommended: disable in prod)
  })

export default dbConfig;