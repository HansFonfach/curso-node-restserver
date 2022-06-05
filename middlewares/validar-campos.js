const { validationResult } = require('express-validator');

const validarCampos = (req, res,next) => { //si el middleware pasa, sigue con el siguiente middleware, por eso el argumento next

    //Si hay errores mando los errores que fueron creados o encontrados por el express-validator
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json(errors);
    }

    next();


}

module.exports = {

    validarCampos
}