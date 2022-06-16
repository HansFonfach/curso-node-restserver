const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
const { esAdminRole } = require('../middlewares/validar-roles');

const esRolValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}



const existeMail = async (correo = '') => {

    const emailExiste = await Usuario.findOne({ correo });

    if (emailExiste) {

        throw new Error(`El correo: ${correo} ya se encuentra registrado`);
    }
}

const existeUsuarioPorId = async (id = '') => {

    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {

        throw new Error(`No existe usuario asociado a la ID: ${id} `);
    }
}

const existeCategoriaPorId = async (id = '') => {

    const existeCategoria = await Categoria.findById(id);

    if (!existeCategoria) {

        throw new Error(`No existe una Categoria asociado a la ID: ${id} `);
    }
}
const existeProductoPorId = async (id = '') => {

    const existeProducto = await Producto.findById(id);

    if (!existeProducto) {

        throw new Error(`No existe un producto asociado a la ID: ${id} `);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion); //verifico que la coleccion exista en el arreglo

    if (!incluida){

        throw new Error(`La coleccion ${coleccion} no es permitida, solo se permiten: ${colecciones}`);
    }
    return true;



}




module.exports = {

    esRolValido,
    existeMail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}

