import { Usuario } from "../models/usuario.js";
import bcrypt from "bcrypt"
export async function cadastrarUsuario(dados) {

    const emailDisponivel = await Usuario.findOne({
        where: {
            email: dados.email
        }
    });

    if(emailDisponivel){
        throw new Error("Este endereço de email já existe");        
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    return await Usuario.create({
        nomeUsuario: dados.nomeUsuario,
        email: dados.email,
        senha: senhaHash,
        role: dados.role
    });
    
}

export async function buscarUsuario(id) {

    return await Usuario.findByPk(id);
    
}