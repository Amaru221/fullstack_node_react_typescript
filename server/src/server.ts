import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'

// Conectar a DB
export async function connectDB() {
    try{
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.bold("conexión exitosa a la DB"))

    }catch(error){
        console.log(error)
        console.log(colors.red.bold("Hubo un error al conectar a la DB"))
    }
}

connectDB()
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products', router)


//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server