//Desestructuro propiedad de express para que pueda funcionar el res.app o ress.json, etc.
const { response } = require('express');


const usuariosGet = (req = request, res = response) => {
    //extraigo los parametros que vienen de la query (todos)
    // const params = req.query; 

    //desestructuro solo los parametros que me interesan
    const {q, nombre = 'No name', apikey} = req.query

    res.json({
        msg: 'get API - controlador ',
        q,
        nombre,
        apikey
       
    });
};

const usuariosPut = (req, res = response) => {
    //obtengo el id que viene en los parametros
    const {id} = req.params;
    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosPost = (req, res = response) => {
    //almaceno todo lo que venga en body (tambien se puede desestructurar y almacenar solo lo que yo quiera)
    const body = req.body;

    res.json({
        msg: 'post API - controlador',
        body //muestro lo que venga en body
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
    usuariosPatch


}