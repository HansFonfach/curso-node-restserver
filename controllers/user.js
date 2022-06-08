//Desestructuro propiedad de express para que pueda funcionar el res.app o ress.json, etc.
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = async (req = request, res = response) => {
    //extraigo los parametros que vienen de la query (todos)
    // const params = req.query; 

    //desestructuro solo los parametros que me interesan
    // const { q, nombre = 'No name', apikey } = req.query
    const { limite = 5, desde = 0 } = req.query;

    const [totalUsuarios, usuarios] = await Promise.all([ //la respuesta es una colección de promesas. Van juntos ya que quiero que la respuesta sea simultanea , el Promise no continua hasta que ambas funcionen
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true }) // condicion de que solo muestre los con estado true 
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        totalUsuarios,
        usuarios

    });
};

const usuariosPut = async (req, res = response) => {
    //obtengo el id que viene en los parametros
    const { id } = req.params;
    //desestrucutracion de la informacion que viene en el body
    const { _id, password, google, correo, ...resto } = req.body; //excluyo los campos que no quiero actualizar

    //TODO validar contra BD

    if (password) {

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10); //mientras mas vuelta mayor seguridad, pero se demora mas en generar

        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
    });
}

const usuariosPost = async (req, res = response) => {

   
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol }); //todos los argumentos que se reciben en el body se los envia al modelo de usuario

    //Encriptar la contraseña

    const salt = bcryptjs.genSaltSync(10); //mientras mas vuelta mayor seguridad, pero se demora mas en generar

    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}


const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;
   
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    const usuarioAutenticado = req.usuario; 

    res.json({
       usuario,
       usuarioAutenticado
    });
}



const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch  API - Controlador'
    });
}




module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch


}