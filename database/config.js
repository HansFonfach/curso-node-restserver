const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CONEXION, { useNewUrlParser: true });
        console.log('BD Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la BD');
    }
}

module.exports = {

    dbConnection
}