const { model } = require("mongoose");

const validarArchivo = (req, res = response, next) => {



    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { //pregunta si en la request viene la propiedad file
        res.status(400).json({ msg: 'No hay archivos para subir' });
        return;
    }

    next();


}

module.exports = {

    validarArchivo

}
