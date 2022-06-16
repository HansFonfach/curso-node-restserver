const { v4: uuidv4 } = require('uuid');
const path = require('path'); //Metodo para poder crear url

//Se trabaja con promesas cuando se quiere manejar lo que sale bien y mal
const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files; //almaceno en archivo lo que venga de la req.files
        const nombreCortado = archivo.name.split('.');  //Lo transforma ademas en un arreglo??
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extension)) { //Pregunta si al extension que viene está incluida dentro de las válidas

            return reject(`La extensión ${extension} no está dentro las extensiones validas ${extensionesValidas}`);

        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp); //el name viene del nombre del archivo que se puede ver en la consola 
        //dirname es donde me encuentro, en este caso helpers

        archivo.mv(uploadPath, (err) => { //lo mueve a la dirección
            if (err) {
                return res.status(500).json({ err });
            }

            resolve(nombreTemp);
        });

    });





}

module.exports = {
    subirArchivo
}