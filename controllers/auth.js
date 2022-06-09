const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express/lib/response');

const login = async (req, res) => {

    const { correo, password } = req.body;
    try {

        //Verificar si existe el Mail
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {

            return res.status(400).json({

                msg: 'Usuario / Password no son correctos'
            })
        }
        //Verificar si el usuario está activo

        if (!usuario.estado) { //verificando si el estado es falso

            return res.status(400).json({

                msg: 'El usuario no existe'
            })
        }

        //Verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password); //el segundo parametro es el de  la base de datos

        if (!validPassword) { //verificando si el estado es falso

            return res.status(400).json({

                msg: 'La contraeña no es valida'
            })
        }

        //Generar JWT

        const token = await generarJWT(usuario.id);

        res.json({

            usuario,
            token

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({

            msg: 'Hable con el administrador'
        })

    }



}


const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { correo, nombre, img } = await googleVerify(id_token); //envio el idtoken a la funcion googleVerify

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {

            //Creo el usuario 
            const data = {
                nombre,
                correo,
                password: ':D',
                img,
                google: true,
                rol: 'USER_ROL'

            }
            //lo guardo en la BD
            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB es false

        if (!usuario.estado) {
            res.status(400).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        //Generar JWT 

        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        })


    } catch (error) {
        res.status(400).json({

        })
    }




}

module.exports = {

    login,
    googleSignIn
}

