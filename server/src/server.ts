import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
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

// Permitir Conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        console.log(origin)
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'), false)
        }
    }
}

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('common'))
server.use('/api/products', router)


//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server