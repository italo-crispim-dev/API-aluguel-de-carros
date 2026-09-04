import * as authService from '../services/auth.service.js'

export async function login(req, res) {

    try{
        console.log("BODY:", req.body);
        const {email, senha} = req.body;

        const token = await authService.login(email, senha);

        console.log("TOKEN GERADO:", token);

        return res.status(200).json({token})
    } catch(error){
        console.error("ERRO NO LOGIN:", error);
        return res.status(401).json({
            message: "Email ou senha invalido"
        });
    }
    
}