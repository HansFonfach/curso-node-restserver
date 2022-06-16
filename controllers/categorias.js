const { response } = require('express');
const res = require('express/lib/response');
const { Categoria } = require('../models');
const { populate } = require('../models/categoria');



//obtenerCategorias - paginado - total - populate
const categoriasGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [totalCategorias, categorias] = await Promise.all([ //la respuesta es una colección de promesas. Van juntos ya que quiero que la respuesta sea simultanea , el Promise no continua hasta que ambas funcionen
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true }) // condicion de que solo muestre los con estado true 
            .populate('usuario', 'nombre') //mando como referencia el usuario y el nombre del usuario que lo ejecutó
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        totalCategorias,
        categorias

    });

};

//obtenerCategoria por id - populate

const categoriasGetPorId = async (req, res = repsonse) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({

        categoria
    })

}



//actualizar categoria 

const categoriasPut = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data);

    res.json({
        categoria
    })




}

//borrarCategoria - estado:false

const categoriasDelete = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });


    res.json({
        categoria,

    });
}


const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase(); //recibo el nombre y lo grabo en mayusculas
    const categoriaDB = await Categoria.findOne({ nombre }); // traigo el nombre para luego comparar que la categoria no exista

    if (categoriaDB) {

        return res.status(400).json({
            msg: `la ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar

    const data = {
        nombre,
        usuario: req.usuario._id //Id de mongo
    }

    const categoria = new Categoria(data); //Se crea una nueva categoria usando el modelo

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria);





}




module.exports = {

    crearCategoria,
    categoriasGet,
    categoriasPut,
    categoriasDelete,
    categoriasGetPorId
}