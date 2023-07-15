
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

  export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',                           // type of our database
    host: process.env.HOST,                     // database host
    port: parseInt(process.env.POSTGRES_PORT),  // database port
    username: process.env.POSTGRES_USER,        // username
    password: process.env.POSTGRES_PASSWORD + '',    // user password
    database: process.env.POSTGRES_DB,          // name of database
    // autoLoadEntities: true,                  // models will be loaded automatically 
    synchronize: true                           // your entities will be synced with the database(recommended: disable in prod)
  }


  // export const typeOrmConfig: TypeOrmModuleOptions = {
  //   type: 'postgres',                           // type of our database
  //   host: 'localhost',                     
  //   port: 5432,                               
  //   username: 'postgres',        
  //   password: '1',   
  //   database: 'nestjs',         
  //   // autoLoadEntities: true,                  // models will be loaded automatically 
  //   synchronize: true                           // your entities will be synced with the database(recommended: disable in prod)
  // }