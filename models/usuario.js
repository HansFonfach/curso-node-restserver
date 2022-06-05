const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],

    },
    img: {
        type: String,

    },
    rol: {
        type: String,
        unique: true,
        emun: ['ADMIN_ROL', 'USER_ROL']
    },

    estado: {

        type: Boolean,
        default: true
    },
    google: {

        type: Boolean,
        default: false

    }



});

//Tiene que ser una funcion normal porque se usara el objeto this y la funcion de flecha mantiene a lo que apunta el this fuera de la misma
UsuarioSchema.methods.toJSON =  function(){

    const {__v, password, ...usuario} = this.toObject(); //Estoy sacando la version y password y todo lo demas será almacenado en usuario
    
    return usuario;

}

module.exports = model('Usuario', UsuarioSchema);