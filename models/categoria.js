const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {

        type: Boolean,
        default: true,
        required: true
    },
    usuario:{ //este es el usuario que crea la categoria
        type: Schema.Types.ObjectId,
        ref: 'Usuario', //como lo ponemos aqui es como debe estar en el modelo de usuario 
        required: true


    }

});


module.exports = model('Categoria', CategoriaSchema);
