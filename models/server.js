const express = require('express');
const app = express();
const cors = require('cors'); 

class Server {

    constructor() {
        //Creando en el servidor la aplicacion de express
        this.app = express();
        this.port = process.env.PORT;
        //Para que otros conozcan la ruta
        this.usuariosPath = 'api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }


    middlewares() {
        //Cors
        this.app.use(cors());
 
        //Lectura y parseo del body (cualquier informacion que venga del get, put, etc la intentará transformar a json)
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }


    //En este metodo irán las rutas
    routes() {
      this.app.use('/api/usuarios', require('../routes/user'))
    }


    listen() {
        this.app.listen(this.port)
    }

}

module.exports = Server;