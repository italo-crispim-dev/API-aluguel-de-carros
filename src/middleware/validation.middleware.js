export function validar (schema){
    return (req, res, next) =>{

        const resultado = schema.safeParse(req.body);

        if(!resultado.success){
            return res.status(400).json({
                message: "Dados invalidos",
                errors: resultado.error.issues
            });
        }

        req.body = resultado.data;

        next()

    };
}

export function validarId(schema) {
    return (req, res, next) => {

        const resultado = schema.safeParse(req.params.id);

        if (!resultado.success) {
            return res.status(400).json({
                message: "ID inválido",
                errors: resultado.error.issues
            });
        }

        req.params.id = resultado.data;
        next();
    };
}