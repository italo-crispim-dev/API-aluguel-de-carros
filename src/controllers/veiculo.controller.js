import { tr } from 'zod/locales';
import * as veiculoService from '../services/veiculo.service.js'

export async function listarveiculos(req, res) {
    
    const veiculos = await veiculoService.listarTodos();

    res.status(200).json(veiculos);

}

export async function buscarVeiculo(req, res) {
    try{
        const veiculo = await veiculoService.buscarPorId(req.params.id);
        if(!veiculo){
            return res.status(404).json({
            message: "Veiculo não encontrado"
        })
        }
        res.status(200).json(veiculo);
    } catch(error){
        res.status(400).json({
            message: "ID invalido"
        })
    }

}

export async function deletarVeiculo(req, res) {
    try{
        const veiculo = await veiculoService.deletarVeiculo(req.params.id);
        if(!veiculo){
            return res.status(404).json({
                message: 'veiculo não encontrado'
        })
    }
    res.status(200).json({message: "Veiculo removido com sucesso"})

    } catch(error){
        if(error.message === 'Não é possivel deletar um veiculo alugado')
        res.status(409).json({
            message: error.message
        })

        return res.status(500).json({
            message: "Erro interno do servidor"
        })
    }
}

//não permirtir alterar carro alugado
export async function atualizarVeiculo(req, res) {

    try{
        const veiculo = await veiculoService.atualizarVeiculo(req.params.id, req.body);
        if(!veiculo){
        return res.status(404).json({
            message: 'Veiculo não encontrado'
        });
        }
    res.status(200).json({
        veiculo,
        message: 'Veiculo atualizado com sucesso'
    });
    } catch(error){
        if(error.message === 'Placa já cadastrada'){
            return res.status(409).json({
                message: error.message
            })
        }
        if(error.message === 'Não é possivel alterar um carro alugado'){
            return res.status(409).json({
                message: error.message
            })
        }
        return res.status(500).json({
            message: "Erro interno do servidor"
        })
    }

}

export async function criarVeiculo(req, res) {
    
    try{
        const veiculo = await veiculoService.criarVeiculo(req.body);
        res.status(201).json(veiculo)

    } catch(error){

        if(error.message === 'Placa já cadastrada'){
            return res.status(409).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: "Erro interno do servidor"
        })
    }

}