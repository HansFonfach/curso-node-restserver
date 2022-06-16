const { response } = require('express');
const res = require('express/lib/response');
const { Producto } = require('../models');
const { populate } = require('../models/categoria');




//obtenerProductos - paginado - total - populate
const ObtenerProductos = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [totalProductos, producto] = await Promise.all([ //la respuesta es una colección de promesas. Van juntos ya que quiero que la respuesta sea simultanea , el Promise no continua hasta que ambas funcionen
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true }) // condicion de que solo muestre los con estado true 
            .populate('usuario', 'nombre') //mando como referencia el usuario y el nombre del usuario que lo ejecutó
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        totalProductos,
        producto

    });

};

//obtenerProducto por id - populate

const obtenerProductoPorId = async (req, res = repsonse) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');

    res.json({

        producto
    })

}



//actualizar Producto 

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {

        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id; //Obtengo el usuario que lo está actualizando

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true});

    res.json({
        producto
    })

}

//borrarCategoria - estado:false

const eliminarProducto = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        producto
    });
}



const crearProducto = async (req, res = response) => {


    const { estado, usuario, ...body } = req.body;
    const productoDB = await Producto.findOne({nombre: body.nombre}); // traigo el nombre para luego comparar que la categoria no exista

    if (productoDB) {

        return res.status(400).json({
            msg: `el producto ${productoDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id //Id de mongo
    }

    const producto = new Producto(data); //Se crea una nueva categoria usando el modelo

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);

}

module.exports = {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    ObtenerProductos,
    obtenerProductoPorId
}