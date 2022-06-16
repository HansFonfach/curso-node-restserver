const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, categoriasGet, categoriasPut, categoriasDelete, categoriasGetPorId } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/Validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');


const router = Router();

//Obtener todas las categorías (público)
router.get('/', categoriasGet);

//Obtener una categoría por id
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId), //se toma el id y se envia a la funcion existeCategoriaPorId y ahí se valida
    validarCampos
], categoriasGetPorId);

//Crear catergoría - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar un registro por el id - privado - cualquier persona con un token válido 
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId), //se toma el id y se envia a la funcion existeCategoriaPorId y ahí se valida
    validarCampos
], categoriasPut);
//Borrar una categoría - Admin

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaPorId), //se toma el id y se envia a la funcion existeCategoriaPorId y ahí se valida
    validarCampos
], categoriasDelete);









module.exports = router; 