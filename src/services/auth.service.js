import bcrypt from "bcrypt";
import {Usuario} from "../models/usuario.js";
import { gerarToken } from "../util/jwt.js";

export async function login(email, senha) {

    const usuario = await Usuario.findOne({
        where: { email}
    });

    if(!usuario){
        throw new Error("Email ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if(!senhaValida){
        throw new Error("Email ou senha inválidos");
    }
    
    const token = gerarToken({
        id: usuario.id,
        role: usuario.role
    });

    return token;
}