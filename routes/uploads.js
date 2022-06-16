const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivo } = require('../middlewares/validar-archivo');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();


router.post('/',validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos

], actualizarImagen);

router.get('/:coleccion/:id',[ 
check('id', 'El id debe ser un id de mongo').isMongoId(),
check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
validarCampos], mostrarImagen);



module.exports = router;
