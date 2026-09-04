import * as usuarioService from '../services/usuario.service.js'

export async function cadastrarUsuario(req, res) {
    
    try{
        const user = await usuarioService.cadastrarUsuario(req.body);
        const {id, nomeUsuario, email, role} = user;
        res.status(201).json({
            id,
            nomeUsuario,
            email,
            role
        });

    } catch(error){
        if(error.message === 'Este endereço de email já existe'){
            return res.status(409).json({
                message: error.message
            })
        }

        return res.status(500).json({ message: "Erro interno do servidor" });

    }
    
}

export async function buscarUsuario(req, res) {
    try{
    const user = await usuarioService.buscarUsuario(req.params.id);
    if(!user){
        return res.status(404).json({
            message: "Não foi possivel encontrar esse usuario"
        })
    }

    const {id, nomeUsuario, email, role} = user;
    res.status(200).json({
            id,
            nomeUsuario,
            email,
            role
        });
    } catch(error){
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
}