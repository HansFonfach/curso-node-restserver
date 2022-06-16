const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, ObtenerProductos, obtenerProductoPorId, actualizarProducto, eliminarProducto } = require('../controllers/producto');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/Validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles');


const router = Router();

//Obtener todos los productos (público)
router.get('/', ObtenerProductos );

//Obtener un producto por id
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId), //se toma el id y se envia a la funcion existeCategoriaPorId y ahí se valida
    validarCampos
], obtenerProductoPorId);

//Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar un registro por el id - privado - cualquier persona con un token válido 
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeProductoPorId), //se toma el id y se envia a la funcion existeCategoriaPorId y ahí se valida
    validarCampos
], actualizarProducto);

//Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId), //se toma el id y se envia a la funcion existeCategoriaPorId y ahí se valida
    validarCampos
], eliminarProducto);









module.exports = router; 