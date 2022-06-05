const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
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



module.exports = {

    esRolValido,
    existeMail,
    existeUsuarioPorId
}

