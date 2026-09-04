import bcrypt from 'bcrypt'
import { Usuario } from '../models/usuario.js'


export async function criarAdminPadrao() {

    const email = process.env.ADMIN_EMAIL;
    const senha = process.env.ADMIN_PASSWORD;

    if (!email || !senha) {
        throw new Error(
            "ADMIN_EMAIL e ADMIN_PASSWORD precisam estar definidos no .env"
        );
    }

    const admin = await Usuario.findOne({
        where: {
            email: process.env.ADMIN_EMAIL
        }
    });

    if(admin){
        return;
    }

    const senhaHash = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,10
    );
    
    await Usuario.create({
        nomeUsuario: "Admin",
        email: process.env.ADMIN_EMAIL,
        senha: senhaHash,
        role: "ADMIN"
    });

    console.log("ADMIN criado com sucesso")

    
}