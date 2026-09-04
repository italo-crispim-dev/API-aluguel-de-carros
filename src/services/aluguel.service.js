import {sequelize} from '../database/db.js';
import { Aluguel } from '../models/aluguel.js';
import { Veiculo } from '../models/veiculo.js';

export async function listarAlugueis() {
    
    return await Aluguel.findAll({
        order: [['id', 'DESC']]
    })

}

export async function buscarAluguel(id) {

    return await Aluguel.findByPk(id);
    
}

export async function alterarAluguel(id, dados) {

    return await sequelize.transaction(async (t) =>{
        const aluguel = await Aluguel.findByPk(id, {
            transaction: t
        });

        if(!aluguel){
            return null
        }

        if(aluguel.status === 'FINALIZADO'){
            throw new Error("Não é possivel alterar um aluguel finalizado")
        }

        const veiculoDisponivel = await Veiculo.findByPk(dados.id_veiculo,{
            transaction: t
        });

        if(!veiculoDisponivel) {
            throw new Error("Veiculo não encontrado");
        }
        if(veiculoDisponivel.status !== "DISPONIVEL"){
            throw new Error("Veiculo não está disponivel")
        }

        const inicio = new Date(dados.data_inicio);
        const fim = new Date(dados.data_fim);
        const dias = Math.round(
            (fim - inicio) / (1000*60*60*24)
        );
        const valor_total = dias * veiculoDisponivel.valor_diaria;
        
        await aluguel.update({
            id_veiculo: dados.id_veiculo,
            data_inicio: dados.data_inicio,
            data_fim: dados.data_fim,
            valor_total
        }, {
            transaction: t
        });
        
        return aluguel

    })
    
}

export async function realizarAluguel(dados) {

    return await sequelize.transaction(async (t) =>{
        const veiculoDisponivel = await Veiculo.findByPk(dados.id_veiculo,{
            transaction: t
        });

        if(!veiculoDisponivel) {
            throw new Error("Veiculo não encontrado");
        }
        if(veiculoDisponivel.status !== "DISPONIVEL"){
            throw new Error("Veiculo não está disponivel")
        }

        const inicio = new Date(dados.data_inicio);
        const fim = new Date(dados.data_fim);
        const dias = Math.round(
            (fim - inicio) / (1000*60*60*24)
        );
        const valor_total = dias * veiculoDisponivel.valor_diaria;

        const aluguel = await Aluguel.create({
            ...dados, valor_total
        },
        {
            transaction: t
        }
        );

        veiculoDisponivel.status = "ALUGADO";
        await veiculoDisponivel.save({
            transaction: t
        });

        return aluguel;
    })

    
    
}

export async function liberarAluguel(id) {

    return await sequelize.transaction(async (t) =>{

        const aluguel = await Aluguel.findByPk(id,{
            transaction: t
        });

        if(!aluguel){
            return false;
        }

        if(aluguel.status === "FINALIZADO"){
            throw new Error("Este aluguel já foi finalizado");
        }

        const veiculo = await Veiculo.findByPk(aluguel.id_veiculo, {
            transaction: t
        });

        if(!veiculo){
            throw new Error("Veiculo não encontrado");
        }

        veiculo.status = "DISPONIVEL"
        await veiculo.save({
            transaction: t
        });

        aluguel.status = "FINALIZADO"
        await aluguel.save({
            transaction: t
        });

        return true;
    })

    
}