import { Veiculo } from "../models/veiculo.js";
import { Op } from 'sequelize'

export async function listarTodos() {

    return await Veiculo.findAll({
        order: [['id', 'ASC']]
    });
    
}

export async function buscarPorId(id) {

    return await Veiculo.findByPk(id);
    
}

export async function criarVeiculo(dados) {
    
    const placaVeiculoExistente = await Veiculo.findOne({
        where: {
            placa: dados.placa
        }
    });

    if(placaVeiculoExistente){
        throw new Error('Placa já cadastrada')
    }

    return await Veiculo.create(dados)

}

export async function deletarVeiculo(id) {

    const veiculo = await Veiculo.findByPk(id);

    if(!veiculo){
        return false;
    }
    if(veiculo.status === 'ALUGADO'){
        throw new Error("Não é possivel deletar um veiculo alugado")
    }

    await veiculo.destroy();
    
    return true;
    
}

export async function atualizarVeiculo(id, dados) {

    const veiculo = await Veiculo.findByPk(id);

    if(!veiculo){
        return null;
    }
    if(veiculo.status === 'ALUGADO'){
        throw new Error("Não é possivel alterar um carro alugado")
    }

    const placaVeiculoExistente = await Veiculo.findOne({
        where: {
            placa: dados.placa,
            id:{
                [Op.ne]: id
            }
        }
    });

    if(placaVeiculoExistente){
        throw new Error('Placa já cadastrada')
    }

    await veiculo.update(dados)
    

    return veiculo;
}

