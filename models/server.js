const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {//Todo lo que se crea aqui se ejecuta cuando levanto el servidor express


        //Creando en el servidor la aplicacion de express
        this.app = express();
        this.port = process.env.PORT;
        //Para que otros conozcan la ruta 
        this.usuariosPath = 'api/usuarios';
        this.authPath = 'api/auth';
        this.categoriasPath = 'api/categorias';
        this.productosPath = 'api/productos';
        this.buscarPath = 'api/buscar';
        this.uploadsPath = 'api/uploads';

        //conexionBD
        this.conectarDB();



        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {

        await dbConnection();
    }


    //un middleware es una funcion que se ejecuta  antes de llamar a un controlador o seguir con otra ejecucion
    middlewares() {
        //Cors
        this.app.use(cors());

        //Lectura y parseo del body (cualquier informacion que venga del get, put, etc la intentará transformar a json)
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public')); 

        //Fileupload - carga de archivos

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));


    }


    //En este metodo irán las rutas
    routes() {
        this.app.use('/api/auth', require('../routes/auth'));
        this.app.use('/api/usuarios', require('../routes/user'));
        this.app.use('/api/categorias', require('../routes/categorias'));
        this.app.use('/api/productos', require('../routes/productos'));
        this.app.use('/api/buscar', require('../routes/buscar'));
        this.app.use('/api/uploads', require('../routes/uploads'));
    }


    listen() {
        this.app.listen(this.port)
    }

}

module.exports = Server;