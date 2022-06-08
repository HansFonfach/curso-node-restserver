const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) { //verifica que no venga vacio 

        return res.status(401).json({
            msg: 'No hay token en la petición'

        });

    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); //Verifica que el token sea un token valido

        const usuario = await Usuario.findById(uid); //Leyendo al usuario de la BD 

        if (!usuario) {

            return res.status(401).json({
                msg: 'Token no válido - el usuario no existe'
            });

        }

        //Verificando que el Usuario no se encuentre en estado false (eliminado)

        if (!usuario.estado) {

            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }

        req.usuario = usuario; //Almaceno el usuario en la request.

        next();


    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }




}


module.exports = {


    validarJWT
}