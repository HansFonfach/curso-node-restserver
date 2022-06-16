const { Schema, model } = require('mongoose');

const productoSchema = Schema({
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
    usuario: { //este es el usuario que crea la categoria
        type: Schema.Types.ObjectId,
        ref: 'Usuario', //como lo ponemos aqui es como debe estar en el modelo de usuario 
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId, //necesito la relacion con el id
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true

    },
    img:{
        type: String
    }

});

productoSchema.methods.toJson = function(){ //función para no mostrar __v y estado

    const {__v, estado, ...data} = this.toObject();
    return data;


}

module.exports = model('Producto', productoSchema);
