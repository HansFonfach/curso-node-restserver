const { response } = require("express")


const esAdminRole = (req, res = response, next) => {
    if (!req.usuario) {

        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });


    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROL') {

        return res.status(401).json({
            msg: `${nombre} no tiene aturización ya que no es un Administrador`
        });


    }

    next();


}


const tieneRole = (...roles) => { //Recibo los parametros y los almaceno en el argumento roles y los transforma en un array (usando el operador rest)

    return (req, res = response, next) => { //retorno la funcion que se va a ejecutar en categorias.js(routes)


        if (!req.usuario) {

            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });


        } //si pasa esta verificación significa que en la request se encuentra el rol del usuario


        if (!roles.includes(req.usuario.rol)) { //si el rol no está incluido en el rol 
            return res.status(401).json({
                msg: `no tienes acceso a esta petición`

            });

        }

        next();


    }



}

module.exports = {
    esAdminRole,
    tieneRole
}