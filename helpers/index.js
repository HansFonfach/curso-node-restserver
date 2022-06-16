const dbValidatos = require('./db-validators');
const generarJwt = require('./generar-jwt');
const subirArchivo = require('./subir-archivos');
const googleVerify = require('./google-verify');

module.exports = {

    ...dbValidatos, 
    ...generarJwt,
    ...subirArchivo,
    ...googleVerify

    //con el ... puedo exportar todas las propiedades

}
