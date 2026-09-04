import * as aluguelService from '../services/aluguel.service.js'

export async function listarAlugueis(req, res) {
    
    const alugueis = await aluguelService.listarAlugueis();

    res.status(200).json(alugueis);

}

export async function buscarAluguel(req, res) {
    
    try{
        const aluguel = await aluguelService.buscarAluguel(req.params.id);
        if(!aluguel){
            return res.status(404).json({
                message: "Aluguel não encontrado"
            })
        }
        res.status(200).json(aluguel);

    } catch(error){
        res.status(400).json({
            message: "ID invalido"
        })
    }
}

export async function realizarAluguel(req, res) {
    
    try{
        const aluguel  = await aluguelService.realizarAluguel(req.body);

        res.status(201).json(aluguel);


    } catch (error){

        if(error.message === 'Veiculo não encontrado'){
            return res.status(404).json({
                message: error.message
            })
        }
        if(error.message === 'Veiculo não está disponivel'){
            return res.status(409).json({
                message: error.message
            })
        }

        return res.status(500).json({
            message: "Erro interno no servidor"
        })
    }

}

//criar especificação dos dados passados na requisição
export async function alterarAluguel(req, res) {
    
    try{

        const aluguel = await aluguelService.alterarAluguel(req.params.id, req.body);
        if(!aluguel){
            return res.status(404).json({
                message: "Aluguel não encontrado"
            })
        }
        res.status(200).json(aluguel);

    } catch(error){
        if(error.message === 'Não é possivel alterar um aluguel finalizado'){
            return res.status(409).json({
                message: error.message
            })
        }
        if(error.message === 'Veiculo não encontrado'){
            return res.status(404).json({
                message: error.message
            });
        }
    
        if(error.message === 'Veiculo não está disponivel'){
            return res.status(409).json({
                message: error.message
            })
        }
        return res.status(500).json({
            message: "Erro interno no servidor"
        })
    }
    
}

//ajeitar a documentação para patch
export async function liberarAluguel(req, res) {

    try{

        const aluguel = await aluguelService.liberarAluguel(req.params.id)

        if (!aluguel) {
            return res.status(404).json({
                message: "Aluguel não encontrado"
            });
        }
        
        res.status(200).json({
            message: "Aluguel liberado com sucesso, veiculo disponivel para aluguel novamente"
        })

    } catch (error){
        
        if(error.message === 'Este aluguel já foi finalizado'){
            return res.status(409).json({
                message: error.message
            })
        }
        if(error.message === 'Veiculo não encontrado'){
            return res.status(404).json({
                message: error.message
            })
        }
        return res.status(500).json({
        message: "Erro interno do servidor"
        });
    }
}