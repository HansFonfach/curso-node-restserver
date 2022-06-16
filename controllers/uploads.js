const path = require('path'); //Metodo para poder crear url
const fs = require('fs');
const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivos');
const { Usuario, Producto } = require('../models');




const cargarArchivo = async (req, res = response) => {




    try {
        //const pathArchivo = await subirArchivo(req.files, ['txt', 'md'], 'textos' );
        const pathArchivo = await subirArchivo(req.files, undefined, 'img');
        res.json({
            nombre: pathArchivo
        })

    } catch (msg) {

        res.status(400).json({
            msg
        });
    }



}


const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe usuario asociado al ID: ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe producto asociado al ID: ${id}`
                });
            }
            break;


        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    //Limpiar imagenes previas

    if (modelo.img) {
        //Hay que borrar la imagen del sevidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img); //busco si existe alguna imagen 
        if (fs.existsSync(pathImagen)) { //si la imagen existe se borra
            fs.unlinkSync(pathImagen);
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion); //lo leo del req.files, las extensiones permitidas por defecto imagenes, y envio si es producto o usuario

    modelo.img = nombre; //nombre del archivo

    await modelo.save();

    res.json(modelo);

}

mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe usuario asociado al ID: ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe producto asociado al ID: ${id}`
                });
            }
            break;


        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto' });
    }

    //Limpiar imagenes previas

    if (modelo.img) {
        //Hay que borrar la imagen del sevidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img); //busco si existe alguna imagen 
        if (fs.existsSync(pathImagen)) { //si la imagen existe se borra
            return res.sendFile(pathImagen);
        }
    }


    const pathImagenVacia = path.join(__dirname, '../assets/no-image.jpg')
    return res.sendFile(pathImagenVacia);



}

module.exports = {

    cargarArchivo,
    mostrarImagen,
    actualizarImagen
}