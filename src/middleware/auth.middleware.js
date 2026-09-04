import { verificarToken } from "../util/jwt.js";

export function autenticar(req, res, next){

    const auth = req.headers.authorization;

    if(!auth) return res.status(401).json({message: "Token não fornecido!"});

    const [tipo, token] = auth.split(" ");
    
    if(tipo !== "Bearer" || !token){
        return res.status(401).json({
            message: "Formato de token invalido"
        });
    }

    try{
        const payload = verificarToken(token);
        req.usuario = payload
        next();
    } catch(error){
        console.error("ERRO AO VALIDAR JWT:", error);
        return res.status(401).json({
            message: "Token invalido ou expirado"
        })
    }

}

export function autorizar(role) {
    return (req, res, next) => {

        if (req.usuario.role !== role) {
            return res.status(403).json({
                message: "Você não possui permissão"
            });
        }

        next();
    };
}