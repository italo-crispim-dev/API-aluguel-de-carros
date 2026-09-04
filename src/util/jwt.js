import jwt from "jsonwebtoken";

export function gerarToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    return token;
}

export function verificarToken(token){
    return jwt.verify(token, process.env.JWT_SECRET);
}