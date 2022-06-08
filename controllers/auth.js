const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

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

module.exports = {

    login
}