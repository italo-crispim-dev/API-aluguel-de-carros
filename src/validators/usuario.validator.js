import { z } from 'zod'

export const criarUsuarioSchema = z.object({

    nomeUsuario: z.string()
        .min(3, "O nome de usuario deve ter pelo menos 3 caracteres"),

    email: z.email("Email inválido"),

    senha: z.string()
        .min(8, "A senha deve possuir pelo menos 8 caracteres")


})

export const loginSchema = z.object({
    email: z.email("Email inválido"),

    senha: z
        .string()
        .min(1, "A senha é obrigatória")
});

export const idSchema = z.coerce.number()
    .int("O ID deve ser um número inteiro")
    .positive("O ID deve ser maior que 0");