const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/user');
const { esRolValido, existeMail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/Validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');


const router = Router();


router.get('/', usuariosGet);


router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId), //se toma el id y se envia a la funcion existeUsuarioPorId y ahí se valida
    validarCampos
], usuariosPut);


router.post('/', [
    check('nombre', 'El nombre es Obligatorio').not().isEmpty(), //Validando que no tenga que estar vacio
    check('password', 'El password debe tener más de 5 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeMail),
    check('rol').custom(esRolValido), //el custom recibe como argumento lo que estoy evaluando del body en este caso rol
    validarCampos //al ultimo porque cuando ya están todas las validaciones del check hechas, ejecuta la que revisa los errores (validarCampos)
], usuariosPost);


router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROL','VENTAS_ROL'), //estos parametros son enviados a la validacion tieneRole
    check('id', 'No es un ID válido').isMongoId(), //valida que el ID sea un ID
    check('id').custom(existeUsuarioPorId), //se toma el id y se envia a la funcion existeUsuarioPorId y ahí se valida
    validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;