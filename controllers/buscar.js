const { response } = require("express");
const { model, default: mongoose } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;


const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

const buscarUsuarios = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //Si es id de mongo devuelve true, de lo contrario false 

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
            //pregunto, si el usuario existe, regreso un arreglo con el usuario, de lo contrario, regreso un arreglo vacio
        })
    }
    
    const regex = new RegExp(termino, 'i'); //expresion regular, para que la busqueda sea insensible a las mayusculas, minusculas, etc
    const usuarios = await Usuario.find({ 
        $or: [{nombre: regex},{correo: regex}], //busco por nombre o correo
        $and: [{estado:true}]
     }); 

    res.json({
        results: usuarios
    })
}

//el termino es el parametro que envio por la url de postman
const buscarCategorias = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //Si es id de mongo devuelve true, de lo contrario false 

    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
            //pregunto, si la categoria  existe, regreso un arreglo con la categoria, de lo contrario, regreso un arreglo vacio
        })
    }
    
    const regex = new RegExp(termino, 'i'); //expresion regular, para que la busqueda sea insensible a las mayusculas, minusculas, etc
    const categoria = await Categoria.find({nombre: regex, estado: true}); 

    res.json({
        results: categoria
    })
}
const buscarProductos = async (termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino); //Si es id de mongo devuelve true, de lo contrario false 

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
            //pregunto, si el producto existe, regreso un arreglo con el producto, de lo contrario, regreso un arreglo vacio
        })
    }
    
    const regex = new RegExp(termino, 'i'); //expresion regular, para que la busqueda sea insensible a las mayusculas, minusculas, etc
    const producto = await Producto.find({nombre: regex, estado: true})
                                   .populate('categoria','nombre');

    res.json({
        results: producto
    })
}

const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {

        return res.status(400).json({
            msg: `las colecciones permitidas son ${coleccionesPermitidas}`

        })
    }

    switch (coleccion) {

        case 'categorias':
            buscarCategorias(termino,res);
            break;
        case 'productos':
            buscarProductos(termino,res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    }



}

module.exports = {
    buscar
}