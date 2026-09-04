import { z } from 'zod';

export const criarAluguelSchema = z.object({

    id_veiculo: z.number()
        .int("O ID do carro deve ser inteiro")
        .positive("O ID do carro deve ser positivo"),

    data_inicio: z.iso.date({
        error: "Data de inicio invalida"
    }),

    data_fim: z.iso.date({
        error: "Data de fim invalida"
    })

}).refine(
    (dados) => dados.data_fim > dados.data_inicio,
    {
        message: "A data de fim não pode ser posterior à data de inicio",
        path: ['data_fim']
    }
)

export const alterarAluguelSchema = z.object({
    id_veiculo: z.number()
        .int("O ID do carro deve ser inteiro")
        .positive("O ID do carro deve ser positivo"),

    data_inicio: z.iso.date({
        error: "Data de inicio invalida"
    }),

    data_fim: z.iso.date({
        error: "Data de fim invalida"
    })

}).refine(
    (dados) => dados.data_fim > dados.data_inicio,
    {
        message: "A data de fim não pode ser posterior à data de inicio",
        path: ['data_fim']
    }
);

export const idSchema = z.coerce.number()
    .int("O ID deve ser um número inteiro")
    .positive("O ID deve ser maior que 0");