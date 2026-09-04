import { z } from 'zod'

export const criarVeiculoSchema = z.object({

    marca: z.string()
        .min(1, "Marca é obrigatorio"),

    placa: z.string()
        .length(8, "A placa deve conter 8 caracteres")
        .regex(
            /^[A-Z]{3}-[0-9][A-Z][0-9]{2}$/,
            "A placa deve estar no formato AAA-1A11"
        ),

    modelo:  z.string()
        .min(1, "Modelo é obrigatorio"),

    ano: z.number()
        .int("Ano deve ser um numero inteiro")
        .positive("Ano deve ser positivo"),
        
    valor_diaria: z.number()
        .positive("O valor da diaria deve ser maior que 0")


})

export const atualizarVeiculoSchema = z.object({

    marca: z.string()
        .min(1, "Marca é obrigatorio"),

    placa: z.string()
        .toUpperCase()
        .length(8, "A placa deve conter 8 caracteres")
        .regex(
            /^[A-Z]{3}-[0-9][A-Z][0-9]{2}$/,
            "A placa deve estar no formato AAA-1A11"
        ),

    modelo:  z.string()
        .min(1, "Modelo é obrigatorio"),

    ano: z.number()
        .int("Ano deve ser um numero inteiro")
        .positive("Ano deve ser positivo"),
        
    valor_diaria: z.number()
        .positive("O valor da diaria deve ser maior que 0")

})

export const idSchema = z.coerce.number()
    .int("O ID deve ser um número inteiro")
    .positive("O ID deve ser maior que 0");